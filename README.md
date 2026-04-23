# 🌍 Wanderlust – Travel Listing Web App

Wanderlust is a full-stack web application inspired by platforms like Airbnb, allowing users to explore, create, and manage travel accommodation listings. It provides a seamless experience for discovering places, posting properties, and interacting through reviews.

---

## 🚀 Features

* 🏡 Browse travel listings (hotels, homes, stays)
* ➕ Add new property listings
* ✏️ Edit & delete your listings
* 🔐 User authentication (Login / Register)
* ⭐ Reviews & ratings system
* 🖼️ Image upload for listings
* 📍 Location-based listings (maps integration)
* ⚡ Responsive and user-friendly UI

---

## 🛠️ Tech Stack

### 💻 Frontend

* HTML
* CSS
* JavaScript
* EJS (Templating Engine)
* Bootstrap

### 🔧 Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB (Mongoose ODM)

### 🔐 Authentication & Tools

* Passport.js (Authentication)
* Express-session
* Cloudinary (Image Storage)
* Map APIs (for location features)

---

## 📂 Project Structure

```
wanderlust-project/
│── models/           # Database schemas
│── routes/           # Route handlers
│── controllers/      # Business logic
│── views/            # EJS templates
│── public/           # Static files (CSS, JS)
│── utils/            # Utility functions
│── middleware/       # Custom middleware
│── app.js            # Main server file
│── package.json      # Dependencies
│── .env              # Environment variables
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Prateek-Gokhale/wanderlust-project.git
cd wanderlust-project
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in root directory and add:

```env
MONGO_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
SECRET=your_session_secret
```

---

### 4️⃣ Run the Application

```bash
node app.js
```

or (recommended):

```bash
nodemon app.js
```

---

### 5️⃣ Open in Browser

```
http://localhost:3000
```

---

## 📸 Screenshots

* 🏠 Home Page (Listings)
* ➕ Add Listing Page
* 🔐 Login/Register Page
* 📄 Listing Details Page
* ⭐ Reviews Section

*(Add screenshots here to improve presentation)*

---

## 🧠 How It Works

1. Users register/login securely
2. Browse or search available listings
3. Add new listings with images and details
4. Other users can view, review, and rate listings
5. Backend handles requests via RESTful APIs and stores data in MongoDB

This type of application follows a typical full-stack architecture with frontend, backend, and database layers working together ([DEV Community][1])

---

## 🎯 Use Cases

* Travel booking platforms
* Airbnb-style rental systems
* Property listing applications
* Learning full-stack development (MERN stack)

---

## 🔮 Future Enhancements

* 💳 Payment integration (Stripe/Razorpay)
* 🔍 Advanced search & filters
* 📱 Mobile-friendly PWA
* 🔔 Notifications system
* 🌍 Multi-language support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to GitHub
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

[1]: https://dev.to/574n13y/overview-of-the-wanderlust-project-2ghf?utm_source=chatgpt.com "Overview of the Wanderlust Project"
