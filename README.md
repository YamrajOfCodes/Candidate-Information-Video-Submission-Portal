# MERN Candidate Video Interview Platform

A complete MERN (MongoDB, Express, React, Node.js) application for managing candidate applications with resume uploads and video interviews.

---

## 🚀 Features
- Candidate application form with validation
- Resume upload (PDF only, ≤ 5MB)
- Video upload via GridFS (MongoDB)
- Backend built with Express + Mongoose
- Secure environment configuration via dotenv

---

## 🏗️ Tech Stack
Frontend: React, Axios, React Router  
Backend: Node.js, Express, Mongoose, MongoDB GridFS  
Database: MongoDB Atlas  
Storage:GridFS for video storage

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/mern-candidate-video-interview.git
cd mern-candidate-video-interview
2️⃣ Backend Setup
📁 Navigate to server folder
If your backend code is in a Server directory:

cd Server
📦 Install dependencies
npm install
⚙️ Create a .env file
In /Server directory, create a .env file with:


PORT=4000
MONGO_URI=<your-mongodb-connection-string>
⚠️ Never commit .env to GitHub — it contains sensitive credentials.

▶️ Run the backend
node server.js
You should see:


✅ MongoDB connected & GridFS initialized
🚀 Server running on port 4000
3️⃣ Frontend Setup
📁 Go to the frontend folder
If your frontend is inside /Client:


cd ../Client
📦 Install dependencies
npm install
🧩 Create API config file
In Client/src/API/api.js:


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/candidate/api',
});

export default api;
▶️ Run the frontend
npm run dev
Your app should be available at:


http://localhost:5173/
🧰 Project Structure
mern-candidate-video-interview/
├── Client/                # React Frontend
│   ├── src/
│   │   ├── API/
│   │   ├── Components/
│   │   └── Pages/
│   └── package.json
│
├── Server/                # Express Backend
│   ├── Controller/
│   ├── Router/
│   ├── Db/
│   ├── Models/
│   ├── server.js
│   └── package.json
│
└── README.md
🧪 API Endpoints
Candidate Application

Method	Endpoint	Description
POST	/candidate/api/apply	Submit candidate data + resume
POST	/candidate/api/video/:id	Upload video for candidate
GET	/candidate/api/video/:id	Stream candidate video
GET	/candidate/api/:id	Fetch candidate details

🛡️ Environment Variables
Variable	Description
PORT	Port for Express server (default: 4000)
MONGO_URI	MongoDB connection string

🧑‍💻 Development Notes
Ensure MongoDB Atlas cluster is active.
Make sure backend runs before frontend.
Videos are stored in MongoDB using GridFS (bucket name: videos).

📜 License
MIT License © 2025

🧠 Author
Kundan
Built with ❤️ and Node.js.
