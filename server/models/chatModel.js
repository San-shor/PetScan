const { Schema, model } = require("mongoose");
const { messageSchema } = require("./messageModel");

const chatSchema = new Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
  messages: {
    type: [messageSchema],
    required: true,
  },
});

const Chat = model("Chat", chatSchema);

module.exports = { chatSchema, Chat };
