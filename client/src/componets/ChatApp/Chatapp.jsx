import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Chatapp.css";
import axios from "axios";

import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
const ChatApp = () => {
  const { userId } = useParams;
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();
  const [allChat, setallChat] = useState([]);
  const [chats, setChats] = useState([]);

  const [chatId, setChatId] = useState("");
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("userType");

  async function getAllChats() {}

  const chatRoom = async () => {
    try {
      const response = await axios.post("http://localhost:3001/chat", {
        userId1: storedUserType === "petParent" ? storedUserId : userId,
        userId2: storedUserType === "petParent" ? userId : storedUserId,
      });
      const chatRoomId = response.data._id;
      setChatId(chatRoomId);

      return response;
    } catch (error) {
      console.log(`Error creating chat room: ${error}`);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!socket) {
      console.log("Socket connection not established");
      return;
    }

    socket.emit("chat message", { message }, chatId, (error) => {
      if (error) {
        console.log(`Error sending message: ${error}`);
      } else {
        console.log("Message sent successfully!");
      }
    });
    setMessage("");
  };
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setMessage(event.target.value);
  };
  const handleSubmit = () => {
    if (chatId && storedUserId && message)
      socket.emit("send_message", {
        content: message,
        chatId,
        sender: storedUserId,
      });
  };

  useEffect(() => {
    const soc = io("http://localhost:3001");
    setSocket(soc);

    soc.on("receive_message", (data) => {
      console.log(data);
      setallChat((prevchat) => [...prevchat, data]);
    });

    chatRoom(storedUserId);
  }, []);

  useEffect(() => {
    if (socket && chatId) {
      socket.on("receive_message", (data) => {
        console.log(data);
        setallChat((prevchat) => [...prevchat, data]);
      });
      socket.emit("join_room", chatId);
    }
  }, [socket, chatId]);

  return (
    <div className="root">
      <Box className="box-container">
        <Box className="header">
          <Typography variant="h5">Chat App</Typography>
        </Box>
        <Box className="chatBox">
          {allChat.map((msg, index) => (
            <Box key={index} my={1}>
              {msg.sender === storedUserId ? (
                <Typography variant="subtitle1">{msg.content}</Typography>
              ) : (
                <Typography variant="subtitle1">{msg.content}</Typography>
              )}
            </Box>
          ))}
        </Box>
        <form className="chat-form" onSubmit={handleSendMessage}>
          <input
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            value={message}
            onChange={handleInputChange}
            className="input"
          />
          <IconButton className="button" type="submit" onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
        </form>
      </Box>
    </div>
  );
};

export default ChatApp;
