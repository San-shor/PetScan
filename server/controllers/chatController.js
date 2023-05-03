const { Chat } = require("../models/chatModel");
const { Client } = require("../models/client.model");
const Vet = require("../models/vet.model");

const getChat = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;
    console.log(userId1, userId2);

    const user1 = await Client.findById(userId1);
    const user2 = await Vet.findById(userId2);
    if (user1 && user2) {
      const checkConvo = await Chat.findOne({
        user1: user1._id,
        user2: user2._id,
      });
      if (checkConvo) {
        res.status(201).send(checkConvo);
      } else if (!checkConvo) {
        const newChat = await Chat.create({
          user1: user1._id,
          user2: user2._id,
          messages: [],
        });

        res.status(201).send(newChat);
      } else {
        res.status(401).send("A chat with these users already exists.");
      }
    } else {
      res.status(401).send("Invalid user IDs.");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const getUserChats = async (req, res) => {
  try {
    const { id } = req.params;
    const user1 = await Client.findById(id);
    const user2 = await Vet.findById(id);

    let chats;

    if (!user1 && !user2) {
      res.status(401).send("Not a user");
    } else if (user1) {
      chats = await Chat.find({ user1: id });
      res.status(200).send(chats);
    } else {
      chats = await Chat.find({ user2: id });
      res.status(200).send(chats);
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, sender } = req.body;
    const time = new Date();
    console.log(time);
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { $push: { messages: [{ content, sender, time }] } },
      { new: true }
    );
    res.status(200).send(updatedChat);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const newMessage = async (data) => {
  try {
    const { chatId, content, sender } = data;
    const time = new Date();
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: [{ content, sender, time }] } },
      { new: true }
    );
    return updatedChat;
  } catch (error) {
    console.log(error);
  }
};

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user1 = await Client.findById(id);
    const user2 = await Vet.findById(id);

    if (user1) res.send(user1);
    else if (user2) res.send(user2);
    else res.status(401).send("Not a user.");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}

module.exports = {
  getChat,
  getUser,
  getUserChats,
  addMessage,
  newMessage,
};
