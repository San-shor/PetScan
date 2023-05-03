import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Chatapp.css";
import axios from "axios";

import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import ChatCard from "./ChatCard";

const ChatApp = () => {
  const [message, setMessage] = useState("");

  const [socket, setSocket] = useState();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState({ messages: [] });

  const [chatId, setChatId] = useState("");
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("userType");

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  async function getAllChats() {
    try {
      const response = await axios.get(
        `http://localhost:3001/chats/${storedUserId}`
      );
      setChats(response.data);
    } catch (error) {
      console.log(`Error getting chats: ${error}`);
    }
  }

  const chatRoom = async (id) => {
    try {
      if (selectedChat) {
        setChatId(id);
      }
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
    getAllChats();
  }, []);

  useEffect(() => {
    if (socket && chatId) {
      socket.on("receive_message", (data) => {
        console.log(data);
        if (data.chatId === selectedChat._id) {
          setSelectedChat((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, data],
          }));
        } else {
        }
      });

      socket.emit("join_room", chatId);
    }
  }, [socket, chatId]);

  useEffect(() => {
    chatRoom(selectedChat._id);
  }, [selectedChat]);

  return (
    <div className="root">
      {chats.map((chat) => (
        <div className="chat-card" onClick={() => handleSelectChat(chat)}>
          <ChatCard key={chat._id} chat={chat}></ChatCard>
        </div>
      ))}
      <div className="chat-app">
        <Box className="box-container">
          <Box className="header">
            <Typography variant="h5">Chat App</Typography>
          </Box>
          <Box className="chatBox">
            {selectedChat.messages.map((msg, index) => (
              <Box key={index} my={1}>
                {msg.sender === storedUserId ? (
                  <Typography className="user-msg" variant="subtitle1">
                    {msg.content}
                  </Typography>
                ) : (
                  <Typography className="otherUser-msg" variant="subtitle1">
                    {msg.content}
                  </Typography>
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
    </div>
  );
};

export default ChatApp;
