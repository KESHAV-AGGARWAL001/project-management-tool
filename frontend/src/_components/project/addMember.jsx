/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/TeamManagement.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import MembersTable from "./Table";
import sendEmail from "../../utils/sendMails";
import socket from "../../socket";

const AddMember = () => {
  const [members, setMembers] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const projectId = localStorage.getItem("projectId");

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/project/getProjectMembers/${projectId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };


  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    console.log(newMemberEmail);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/checkProfile`,
        {
          params: { email: newMemberEmail },
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // Check if user exists
      if (!response.data.success) {
        alert("This email is not registered on our platform. Please ask the user to sign up first.");
        return;
      }

      const user = response.data.user[0];
      console.log("User Data from backend :) ", user);

      // Check if user is already in the project
      const newUserResponse = await axios.post(
        `http://localhost:3000/api/project/addNewMember/${projectId}`,
        { memberId: user._id, projectId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log("newUserResponse :)", newUserResponse);

      const managerResponse = await axios.get(
        `http://localhost:3000/api/user/profile`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const managerEmail = managerResponse?.data[0].email;


      // console.log("managerResponse :)", managerResponse);
      console.log("managerEmail :)", managerEmail);

      if (newUserResponse.data?.message === "This member is already in the project") {
        alert("This member is already in the project");
        return;
      }

      try {
        console.log("Sending email to:", user.email);
        await sendEmail(managerEmail, newMemberEmail);
        const memberId = user._id;
        socket.emit("add-member", "New Member is added", projectId, memberId);
        fetchMembers();
        setNewMemberEmail("");
      } catch (error) {
        console.error("Error sending invitation email:", error);
        alert("Failed to send invitation email. Please try again or contact support.");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member. Please try again.");
    }
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-4">Team Management</h1>

      <div className="mt-4">
        <form onSubmit={handleAddMember}>
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Enter member email"
            className="block w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Add Member
          </button>
        </form>
      </div>

      <MembersTable members={members} />
    </div>
  );
};

export default AddMember;
