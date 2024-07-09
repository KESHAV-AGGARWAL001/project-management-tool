// src/pages/CreateProject.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const [projectId, setProjectId] = useState("");

  const fetchingUser = async () => {
    const userResponse = await axios.get(
      "http://localhost:3000/api/user/profile",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const user = userResponse.data;
    const userId = user._id;
    // console.log("user Id is :) ", userId);
    setCreatedBy(userId);
  };

  useEffect(() => {
    fetchingUser();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      projectName,
      description,
      deadline,
      createdBy,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/project/postNewProject",
        projectData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setProjectId(response.data._id);
      localStorage.setItem("projectId", projectId);
      setProjectName("");
      setDescription("");
      setDeadline("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Create Project</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
