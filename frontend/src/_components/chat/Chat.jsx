/* eslint-disable react-hooks/exhaustive-deps */
// create a new chat page for my ui ?
import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "../../socket.js";
import axiosInstance from "../../utils/globalRateLimiter.js";
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [senderId, setSenderId] = useState("");
  // const [chatId, setChatId] = useState("");
  const [projectId, setProjectId] = useState(
    localStorage.getItem("projectId") || ""
  );
  const [validate, setValidate] = useState(false);

  const fetchingUser = async () => {
    const userResponse = await axios.get(
      "http://localhost:3000/api/user/profile",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const user = userResponse?.data[0];
    const userId = user?._id;
    // console.log("user Id is :) ", userId);
    setSenderId(userId);
  };

  const fetchingMessages = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/chat/project/" + projectId
    );
    // console.log(response);

    const data = response?.data[0];
    // console.log("data :)", data);
    const allMessages = data?.messages;
    // console.log("allMessages :)", allMessages);
    const messageBackend = [];
    allMessages?.forEach((element) => {
      messageBackend.push(element.content);
    });
    // setChatId(data?._id);
    setMessages(messageBackend);
    // console.log("messageBackend :)", messageBackend);

  };

  useEffect(() => {
    if (!validate) return;
    fetchingUser();
    fetchingMessages();

    socket.on("newMessage", (message) => {
      // console.log("got new message -> ", message);
      setMessages((prev) => [...prev, message]);
    });

    socket.emit("join-room", projectId);
  }, [validate]);

  // handle project id function
  const handleProjectId = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      "http://localhost:3000/api/project/checkProject/" + projectId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (response.data.success) {
      setValidate(true);
      localStorage.setItem("projectId", projectId);
    } else {
      alert("Enter the right chat room id");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/messages/sendMessage",
        {
          chatId: localStorage.getItem("projectId"),
          content: newMessage.trim(),
          senderId
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );

      // console.log(response);

      if (response.data) {
        socket.emit("send-message", newMessage, projectId);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert(error.response?.data?.message || "Failed to send message");
    }
  };

  return projectId && validate ? (
    <div>
      <h1 className="text-3xl font-bold mb-4">Chat Page</h1>
      <div className="min-h-[750px]  flex flex-col items-center justify-end w-screen mx-auto bg-gray-100">
        {messages?.length > 0 && (
          <div className=" max-h-[600px] w-full overflow-scroll p-4 bg-white rounded shadow-md">
            {messages?.map((message, index) => (
              <div key={index} className=" flex justify-between mb-2">
                <span className="text-gray-600">{message.username}</span>
                <span className="message-text text-gray-800">{message}</span>
              </div>
            ))}
          </div>
        )}
        <form className="w-full p-4  bg-white rounded shadow-md mt-4">
          <input
            type="text"
            value={newMessage}
            id="chatMessage"
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 pl-10 text-sm text-gray-700 outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 m-4 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  ) : (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl text-center mb-4">
            Hey User ! Put the Chat Id from Email you got from the manager
          </h1>
          <form onSubmit={handleProjectId}>
            <input
              name="chat-room"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              id="chat-room-id"
              className="w-full p-2 pl-10 text-lg text-gray-700 outline-none"
              placeholder="Enter the chat room Id here"
            />
            <button
              type="submit"
              className="bg-green-500 mt-5 w-full hover:bg-green-700 text-white font-bold px-4 py-2 rounded"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
