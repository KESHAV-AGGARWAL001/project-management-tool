// src/pages/TeamManagement.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import MembersTable from "./Table";
import sendEmail from "../../utils/sendMails";
import socket from "../../socket";

const AddMember = () => {
  const [members, setMembers] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const projectId = localStorage.getItem("roomId");

  useEffect(() => {
    fetchMembers();
  }, []);

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
      //   console.log(response.data);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };
  const handleAddMember = async (e) => {
    e.preventDefault();
    console.log(newMemberEmail);
    try {
      // Check if the member exists

      const response = await axios.get(
        `http://localhost:3000/api/user/checkProfile`,
        {
          params: { email: newMemberEmail },
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (!response.data.success) {
        return alert(
          "Enter the right Email or User has not created his account on this platform"
        );
      }

      const user = response.data.user[0]; // Ensure the structure matches your backend response
      //   console.log("User Data to frontend:) ", user);
      // Add the new member to the project
      const newUserResponse = await axios.post(
        `http://localhost:3000/api/project/addNewMember/${projectId}`,
        { memberId: user._id, projectId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setNewMemberEmail("");

      // console.log(newUserResponse.data);

      if (
        newUserResponse.data?.message ===
        "This member is already in the project"
      ) {
        alert("This member is already in the project");
        return;
      }

      sendEmail(user.email, newMemberEmail);
      // console.log(response.data.user[0]);

      const memberId = response.data.user[0]?._id;

      socket.emit("add-member", "New Member is added", projectId, memberId);
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
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
