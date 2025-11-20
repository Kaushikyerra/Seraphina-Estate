# 🏨 The Seraphina Estate

<div align="center">
  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![GitHub stars](https://img.shields.io/github/stars/Kaushikyerra/Seraphina-Estate?style=social)](https://github.com/Kaushikyerra/Seraphina-Estate/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/Kaushikyerra/Seraphina-Estate?style=social)](https://github.com/Kaushikyerra/Seraphina-Estate/network/members)
</div>

## 🌟 Overview

Welcome to **The Seraphina Estate** - A luxurious hotel booking platform that provides a seamless experience for guests to discover and book rooms at our exquisite property. This full-stack application combines a modern React frontend with a robust Node.js backend, offering a complete hotel management solution.

## ✨ Features

- 🛏️ **Room Booking System** - Browse and book various room types with real-time availability
- 📅 **Date Selection** - Intuitive calendar interface for check-in/check-out dates
- 📱 **Responsive Design** - Fully responsive layout that works on all devices
- 🔐 **User Authentication** - Secure login and registration system
- 📊 **Admin Dashboard** - Manage bookings, rooms, and user accounts
- 🌐 **Multi-step Booking Process** - Streamlined booking flow with multiple steps
- 📱 **Modern UI/UX** - Built with Tailwind CSS for a beautiful, modern interface

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Context API
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Icons**: Lucide Icons

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- MongoDB Atlas account or local MongoDB instance

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kaushikyerra/Seraphina-Estate.git
   cd Seraphina-Estate/hotel-booking
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory and add:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```
   - Create a `.env` file in the `backend` directory and add:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the development servers**
   ```bash
   # Start frontend (from root directory)
   npm run dev
   
   # In a new terminal, start backend
   cd backend
   npm run dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📂 Project Structure

```
seraphina-estate/
├── public/               # Static files
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── backend/
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── config/           # Configuration files
│   └── server.js         # Backend entry point
├── .gitignore
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## 📧 Contact

For any inquiries, please reach out to [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">
  Made with ❤️ by Kaushik Yerra
</div>
