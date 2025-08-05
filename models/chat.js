const mongoose = require("mongoose"); // importing mongoose to interact with MongoDB

const chatSchema = new mongoose.Schema({  // defining the schema for chat messages
    from :{
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        maxLength: 80
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Chat = mongoose.model("Chat", chatSchema); // creating a model for the chat schema

module.exports = Chat; // exporting the Chat model for use in other files
