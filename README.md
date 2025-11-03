💬 QuickChat - Real-Time Messaging Application

A modern, feature-rich chat application built with the MERN stack that enables seamless real-time communication between users.

![QuickChat Banner](https://via.placeholder.com/1200x400/936EFF/FFFFFF?text=QuickChat+-+Connect+Instantly)

✨ Features

- 🚀 **Real-time Messaging** - Instant message delivery using Socket.IO
- 👥 **User Authentication** - Secure signup and login system with JWT
- 🟢 **Online Status** - Track which users are currently active
- 📸 **Image Sharing** - Send and receive images in conversations
- 🔔 **Unread Messages** - Visual indicators for unseen messages
- 👤 **Profile Management** - Customize your profile with photos and bio
- 🎨 **Modern UI** - Clean and intuitive interface built with React and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

🛠️ Tech Stack

Frontend
- **React 19** - UI library for building interactive interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Socket.IO Client** - Real-time bidirectional communication
- **Axios** - Promise-based HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Beautiful notifications

Backend
- **Node.js** - JavaScript runtime environment
- **Express 5** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - Elegant MongoDB object modeling
- **Socket.IO** - Real-time event-based communication
- **JWT** - Secure authentication tokens
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image upload and storage

📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary Account** (for image uploads)

🚀 Getting Started

Follow these steps to run QuickChat locally on your machine.

1. Clone the Repository

```bash
git clone https://github.com/yourusername/quickchat.git
cd quickchat
```

2. Configure Environment Variables

Backend Configuration
Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

Add the following variables to `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Frontend Configuration
Create a `.env` file in the `client` directory:

```bash
cd ../client
touch .env
```

Add the following variable to `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

3. Install Dependencies

Install Server Dependencies
```bash
cd server
npm install
```

Install Client Dependencies
```bash
cd ../client
npm install
```

4. Launch the Application

Start the Backend Server
```bash
cd server
npm run server
```
The server will start on `http://localhost:5000`

Start the Frontend Development Server
Open a new terminal window:
```bash
cd client
npm run dev
```
The client will start on `http://localhost:5173`

5. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

Create an account, log in, and start chatting! 🎉

📁 Project Structure

```
quickchat/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # Context API for state management
│   │   ├── pages/         # Page components
│   │   └── main.jsx       # Application entry point
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── lib/               # Utility functions
│   ├── server.js          # Server entry point
│   └── package.json
│
└── README.md
```

🔑 API Endpoints

Authentication Routes
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/check` - Verify authentication status
- `PUT /api/auth/update-profile` - Update user profile

Message Routes
- `GET /api/messages/users` - Fetch all users for sidebar
- `GET /api/messages/:id` - Retrieve messages with specific user
- `POST /api/messages/send/:id` - Send message to user
- `PUT /api/messages/mark/:id` - Mark message as seen

🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

📝 License

This project is licensed under the ISC License.

👨‍💻 Author

Built with ❤️ by Aksh

 🙏 Acknowledgments

- Socket.IO for real-time communication
- MongoDB for flexible data storage
- Cloudinary for image management
- Tailwind CSS for beautiful styling

---

⭐ **Star this repository** if you find it helpful!
