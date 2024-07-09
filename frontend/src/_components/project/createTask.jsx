// src/pages/TaskCreation.jsx
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("assigned");
  const [members, setMembers] = useState([]);
  const projectId = localStorage.getItem("roomId");

  const [managerId, setManagerId] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const options = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      console.log(projectId);
      const response = await axios.get(
        `http://localhost:3000/api/project/getProjectMembers/${projectId}`,
        options
      );
      // console.log(response.data);
      setMembers(response.data);
      response.data.forEach((element) => {
        if (element.role === "manager") {
          setManagerId(element._id);
        }
      });
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      dueDate,
      assignedTo,
      status,
      projectId,
      createdBy: managerId,
    };

    try {
      await axios.post("http://localhost:3000/api/task/createTask", taskData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");
      setStatus("assigned");

      // console.log(response);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <form onSubmit={handleCreateTask}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label>Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member.email} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="assigned">Assigned</option>
            <option value="inProgress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
