
# MongoDB Express CRUD Chat Application

A full-stack chat application demonstrating complete **CRUD operations** using **MongoDB** and **Express.js**. This project showcases how to build a RESTful web application with MongoDB as the database, Express.js as the backend framework, and EJS for server-side rendering. It also features robust error handling and async utilities for a production-ready experience.

## 🛠️ Features

- View all chat messages
- Add a new chat
- Edit existing messages
- Delete messages
- Server-side rendering using EJS
- Method override for PUT and DELETE support in HTML forms

- Robust error handling with custom middleware
- Async error catching using `asyncWrap`
- Custom `ExpressError` class for clean error responses

## 📁 Project Structure

```
index.js         # Main server file (Express, routes, error handling)
init.js          # Demo data seeding script
models/
	chat.js        # Mongoose schema/model for chat messages
public/
	style.css      # Stylesheet
views/
	index.ejs      # Main chat list view
	new.ejs        # New chat form
	edit.ejs       # Edit chat form
```


## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS
- Method-Override
- Body-parser (via `express.urlencoded`)
- HTML AND CSS

## 🚀 Getting Started


### Prerequisites

- Node.js and npm installed
- MongoDB running locally (on `mongodb://127.0.0.1:27017`)

### Database Setup

**Important:** Ensure both your application and the `init.js` seeding script use the same database name (e.g., `whatsapp`).

### Seeding Demo Data

To seed the database with demo chat data, run:

```sh
node init.js
```

This will insert sample chats into the `whatsapp` database.

### Running the App

Start your Express server as usual:

```sh
node index.js
```

Visit `http://localhost:8080/chats` to view the chat app.

### Error Handling

- All async route handlers are wrapped with a custom `asyncWrap` utility to catch errors.
- Validation and other errors are handled by custom middleware and the `ExpressError` class.
- User-friendly error messages are sent for invalid operations or missing resources.
  
