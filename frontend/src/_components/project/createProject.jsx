// src/pages/CreateProject.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/globalRateLimiter";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const fetchingUser = async () => {
    // console.log("token checking at createProject.jsx" + localStorage.getItem("token"));

    const userResponse = await axios.get(
      "http://localhost:3000/api/user/profile",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const user = userResponse.data[0];
    const userId = user._id;

    // console.log(userResponse);
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
      // Create project
      const projectResponse = await axiosInstance.post(
        "/project/postNewProject",
        projectData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const projectId = projectResponse.data._id;

      // Create chat for the project
      try {
        await axiosInstance.post(
          "/chat/create",
          { projectId },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        console.error("Error creating chat:", error);
        return;
      }

      localStorage.setItem("projectId", projectId);
      setProjectName("");
      setDescription("");
      setDeadline("");

      // You can add navigation here if needed
      // navigate('/project-dashboard');
    } catch (error) {
      console.error("Error creating project:", error);
      alert(error.response?.data?.message || "Failed to create project");
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
