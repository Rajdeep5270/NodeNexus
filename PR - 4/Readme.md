# 🎬 Movie Management System

![Movie Management Demo](https://github.com/Rajdeep5270/NodeNexus/blob/master/PR%20-%204/Movie%20Management%20System.gif)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/) 
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **Movie Management System** built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**.  
This web app allows users to **add, view, edit, and delete movies** easily.

---

## 📽 Features

- View all movies  
- Add a new movie  
- Edit movie details  
- Delete movies  
- Clean and user-friendly interface using EJS templates  

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Templating Engine:** EJS  
- **Other Libraries:** express.urlencoded, express.static  

---

## 📂 Project Structure
```
Movie-Management-System/
│
├── config/
│ └── db.config.js # MongoDB connection setup
│
├── model/
│ └── movie.model.js # Mongoose schema for Movie
│
├── views/
│ ├── view.ejs # Homepage view
│ ├── addMovieForm.ejs # Add movie form
│ ├── editMovieForm.ejs # Edit movie form
│ └── allMovieViewPage.ejs # View all movies
│
├── server.js # Express server & routes
└── package.json # Project dependencies
```
---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Rajdeep5270/NodeNexus.git
cd NodeNexus

2. Install dependencies:
npm install / npm i

3. Set up MongoDB:
Make sure MongoDB is running locally or update the URI in config/db.config.js.

4. Start the server:
npm start/ node --watch server

5. Open your browser and navigate to:
http://localhost:8080

```

Usage

1. Homepage: Lists all movies in the database.
2. Add Movie: Go to /addMovie to add a new movie.
3. Edit Movie: Click edit for a specific movie to update details.
4. Delete Movie: Click delete for a specific movie to remove it.

Contributing

1. Fork the repository
2. Create a new branch: git checkout -b feature-name
3. Make your changes and commit: git commit -m "Add new feature"
4. Push to the branch: git push origin feature-name
5. Create a Pull Request

License

This project is licensed under the MIT License.

---

You can **copy all of this**, create a file called `README.md` in your project folder, and paste it there. Then, when you push your project to GitHub, this will automatically appear on your repository page.  
If you want, I can also make a **more visual version with badges, like Node.js, MongoDB, and License badges**, so it looks more professional on GitHub.  
Do you want me to add that too?
