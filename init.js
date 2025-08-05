const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main().then(() => {console.log('Connected to MongoDB')})
 .catch(err => console.log(err));
 async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 }

let allChats = [
    {
        from: 'Alice',
        to: 'Bob',
        message: 'Hello Bob!',
        created_at: new Date()
    },
    {
        from: 'Bob',
        to: 'Alice',
        message: 'Hi Alice!',
        created_at: new Date()
    },
    {
        from: 'Charlie',
        to: 'Alice',
        message: 'Hey Alice!',
        created_at: new Date()
    },
    {
        from: 'David',
        to: 'Alice',
        message: 'Hi Alice!',
        created_at: new Date()
    }
];

Chat.insertMany(allChats)
    .then(() => {
        console.log('All chats inserted');
    })
    .catch(err => {
        console.error('Error inserting chats:', err);
    });
