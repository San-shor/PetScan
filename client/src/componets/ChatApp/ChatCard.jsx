import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import axios from "axios";
import "./ChatCard.css";

const ChatCard = ({ chat }) => {
  const [otherUser, setOtherUser] = useState({
    firstName: "User",
    lastName: "",
  });

  const storedUserId = localStorage.getItem("userId");

  async function getOtherUserInfo(id) {
    const response = await axios.get(`http://localhost:3001/user/${id}`);
    console.log(response);

    setOtherUser(response.data);
  }

  useEffect(() => {
    const otherUserId = chat.user1 === storedUserId ? chat.user2 : chat.user1;
    getOtherUserInfo(otherUserId);
  }, []);

  return (
    <div className="chat-list">
      <div className="chat-messageList">
        <ul>
          <li>
            <img
              src={
                otherUser.vetProfile
                  ? otherUser.vetProfile
                  : otherUser.profilePicture
              }
              alt=""
            />

            <h5> {otherUser.firstName + " " + otherUser.lastName}</h5>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatCard;
