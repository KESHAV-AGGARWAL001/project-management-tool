// eslint-disable-next-line
import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/globalRateLimiter";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("assigned");
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const projectId = localStorage.getItem("projectId");
  const [managerId, setManagerId] = useState("");

  useEffect(() => {
    fetchMembers();

    console.log(members);
  }, []);

  const fetchMembers = async () => {
    try {
      const options = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      // First get project details to find manager ID
      const projectResponse = await axios.get(
        `http:localhost:3000/api/project/getProjectDetails/${projectId}`,
        {
          ...options,
          params: {
            projectId: projectId
          }
        }
      );

      if (projectResponse.data.success) {
        const project = projectResponse.data.project;
        setManagerId(project.createdBy);
        console.log("Manager ID set to:", project.createdBy);

        // Then get project members
        const membersResponse = await axios.get(
          `http://localhost:3000/api/project/getProjectMembers/${projectId}`,
          options
        );

        console.log(membersResponse);

        if (membersResponse.data.success) {
          setMembers(membersResponse.data.members);
        } else {
          setError(membersResponse.data.message || "No members found");
        }
      } else {
        console.error("Failed to get project details:", projectResponse.data.message);
        setError(projectResponse.data.message || "Failed to get project details");
      }
    } catch (error) {
      console.error("Error in fetchMembers:", error);
      setError(error.response?.data?.message || "Failed to fetch project data");
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!dueDate) {
      setError("Due date is required");
      return false;
    }
    if (!assignedTo) {
      setError("Please assign the task to someone");
      return false;
    }
    if (!status) {
      setError("Status is required");
      return false;
    }

    // Validate due date is not in the past
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Due date cannot be in the past");
      return false;
    }

    return true;
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      assignedTo,
      status,
      projectId,
      createdBy: managerId,
    };

    try {
      await axiosInstance.post("/task/createTask", taskData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      // Reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");
      setStatus("assigned");
      setError("");
    } catch (error) {
      console.error("Error creating task:", error);
      setError(error.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleCreateTask}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status</label>
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
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
