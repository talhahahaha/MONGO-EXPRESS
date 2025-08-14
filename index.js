const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');// it is used to resolve the path of the file
const Chat = require('./models/chat.js'); // importing the Chat model
const methodOverride = require('method-override'); // to use PUT and DELETE methods in forms
const ExpressError = require('./ExpressError'); // importing the ExpressError class


app.set('views', path.join(__dirname, 'views'));// setting the views directory
app.set('view engine', 'ejs');// setting the view engine to ejs
app.use(express.static(path.join(__dirname, 'public')));// serving static files from the public directory
app.use(express.urlencoded({ extended: true })); // to parse the request body
app.use(methodOverride('_method')); // to use PUT and DELETE methods in forms



//mongoose setup
 main().then(() => {console.log('Connected to MongoDB')})
 .catch(err => console.log(err));
 async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 }

 //index route
 app.get("/chats", async (req, res) => {
   try{
     let chats = await Chat.find();
    res.render("index.ejs", { chats });//{chats} is an object that contains the chats array
   } catch (err) {
       next(err);
   }
    });




// new route
    app.get('/chats/new', (req, res) => {
        res.render('new.ejs');
    });


//create route
app.post('/chats',asyncWrap(async(req, res) => {
let {from, message, to} = req.body; // destructuring the request body
let newChat = new Chat({
    from: from,
    message: message,
    to: to,
    created_at: new Date()
});
await newChat.save();
        res.status(500).send('Internal Server Error');
}));

 //asyncwrap
 function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err))
    };
};

//show-route
app.get('/chats/:id', asyncWrap(async(req, res,next)=>{
    let {id} = req.params; 
    let chat = await Chat.findById(id);
    if(!chat){
     next(new ExpressError(404, "Chat Not Found"));
    }
    res.render('edit.ejs', { chat });
}));

//edit route
app.get('/chats/:id/edit', asyncWrap(async(req, res) => {
     let {id}= req.params; // getting the id from the request parameters
    let chat =  await Chat.findById(id); 
    res.render('edit.ejs', { chat }); // rendering the edit view with the chat object

}));

//update route
app.put('/chats/:id', asyncWrap(async(req, res) => {
   let {id} = req.params; // getting the id from the request parameters
    let {message:newMessage} = req.body; // getting the new message from the request body
    let updatedChat = await Chat.findByIdAndUpdate(id, {message:newMessage}, {runValidators: true});
    res.redirect('/chats'); // redirecting to the chats page
}));




//delete route
app.delete('/chats/:id', asyncWrap(async(req, res) => {
    let {id} = req.params; // getting the id from the request parameters
let deletedChat = await Chat.findByIdAndDelete(id);
res.redirect('/chats'); // redirecting to the chats page
}));










    app.get('/', (req, res) => {
    res.send('root is working');
    });

    const handleValidationErrors = (err) => {
        console.log("this is a validation error");
        console.dir(err.mesage);
        return err;
    };

    app.use((err, req, res, next) => {
        console.log(err.name);
        if (err.name === 'ValidationError') {
            err = handleValidationErrors(err);
        }
        next(err);
    });

// error handling middleware
app.use((err, req, res, next)=>{
    let {status=500,message="some error occured"} = err;
    res.status(status).send(message);
});




    app.listen(8080, () => {
    console.log('Server is running on port 8080');
    });
