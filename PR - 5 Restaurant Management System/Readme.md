# 🍽️ Restaurant Management System (Node.js & Express)

A complete **Restaurant Management System** built using **Node.js, Express, Multer, and MVC architecture**.  
This project allows admin to **add, view, edit, delete food items** category-wise like:

- Gujarati
- Rajasthani
- South Indian
- Other Items

---

## 🎥 Project Demo (GIF)

![Restaurant Management System](https://github.com/Rajdeep5270/NodeNexus/blob/master/PR%20-%205%20Restaurant%20Management%20System/Restaurant%20Management%20System.gif)

---

## 🚀 Features

- 📂 Category-wise Food Management
- 📸 Image Upload using **Multer**
- ✏️ Edit & Update Food Items
- 🗑️ Delete Food Items
- 🧾 MVC Folder Structure
- 🛒 Add to Order Functionality
- ⚡ Express Router Based Modules

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Multer (Image Upload)**
- **EJS (View Engine)**
- **Bootstrap (UI)**

---

## 📁 Folder Structure
```
project/
│
├── controller/
│ ├── gujrati.controller.js
│ ├── rajasthani.controller.js
│ ├── southindian.controller.js
│ └── items.controller.js
│
├── routes/
│ ├── gujrati.route.js
│ ├── rajasthani.route.js
│ ├── southindian.route.js
│ └── items.route.js
│
├── uploads/
│ ├── gujratiItems/
│ ├── rajasthaniItems/
│ └── southIndianItems/
│
├── views/
├── models/
└── app.js
```

---

## 🧩 Gujarati Food Routes Example

```js
// Gujarati Routes
route.get('/', addGujaratiDishPage);
route.post('/addGujratiDish', uploads.single('dish_image'), addGujratiDish);
route.get('/gujratiFoodViewPage', gujratiFoodViewPage);
route.get('/gujratiFoodEditPage/:id', gujratiFoodEditPage);
route.post('/gujratiDishUpdate/:id', uploads.single('dish_image'), gujratiDishUpdate);
route.get('/gujratiDishDelete/:id', gujratiDishDelete);

```

## 🙌 Author

👨‍💻 Rajdeep Singh  
Web Developer | Creative Coder | Animation Enthusiast  

🌐 Portfolio: [rajdeepsingh.vercel.app](https://rajdeepsingh.vercel.app)  
🔗 GitHub: [github.com/Rajdeep5270](https://github.com/Rajdeep5270)  
💼 LinkedIn: [linkedin.com/in/rajdeep-singh](https://www.linkedin.com/in/rajdeep-singh/) 
