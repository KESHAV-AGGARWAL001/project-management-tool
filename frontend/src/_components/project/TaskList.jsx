import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectId = localStorage.getItem("projectId");

  console.log("projectId at task list is : ", projectId);

  useEffect(() => {
    const fetchTasks = async () => {
      try {


        const response = await axios.get(
          `http://localhost:3000/api/task/getAllTasks/${projectId}`,

          {
            headers: {
              token: localStorage.getItem("token"),
            },
            params: {
              projectId: projectId,
            }
          }
        );
        console.log(response);
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const getDaysLeft = (dueDate) => {
    const difference = new Date(dueDate) - new Date();
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "assigned":
        return "bg-yellow-300 text-yellow-800";
      case "inProgress":
        return "bg-blue-300 text-blue-800";
      case "complete":
        return "bg-green-300 text-green-800";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>
            <div className="mb-4">
              <span className="font-semibold">Assigned To:</span>{" "}
              {task.assignedTo.email}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Due Date:</span>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </div>

            {getDaysLeft(task.dueDate) > 0 ? (
              <>
                <div className="mb-4">
                  <span className="font-semibold">Days Left:</span>{" "}
                  {getDaysLeft(task.dueDate)}
                </div>
                <div
                  className={`px-4 py-2 rounded ${getStatusColor(task.status)}`}
                >
                  {task.status}
                </div>
              </>
            ) : (
              <div className="px-4 py-2 rounded bg-red-500 text-white">
                Expired
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
