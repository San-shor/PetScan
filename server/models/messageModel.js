const { Schema, model } = require("mongoose");
const { clientSchema } = require("../models/client.model");
const { Vet } = require("../models/vet.model");

const messageSchema = new Schema({
  content: {
    type: String,
    requires: true,
  },
  sender: {
    type: String,
    required: true,
  },
});

const Message = model("Message", messageSchema);

module.exports = { messageSchema, Message };
