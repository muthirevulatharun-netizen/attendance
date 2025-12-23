# AttendPro - Attendance Tracker

A modern, full-stack attendance tracking web application built with React, Express, and Tailwind CSS.

## 🎯 Features

- 🔐 Simple login system (accepts any credentials for demo)
- 📊 Beautiful dashboard with attendance cards
- 📈 Overall attendance percentage with circular progress
- 🎨 Modern purple-themed UI with responsive design
- 🚀 Fast development with hot reload

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router

**Backend:**
- Node.js
- Express
- CORS enabled

## 📁 Project Structure

```
AttendPro/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/            # Express backend
│   ├── server.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download this project**

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

## ▶️ Running the Application

### Terminal 1 - Start Backend Server:

```bash
cd backend
npm run dev
```

Backend will run on: **http://localhost:5000**

You should see:
```
🚀 AttendPro Backend running on http://localhost:5000
📡 API endpoints:
   POST /api/login
   GET /api/attendance/:roll_no
```

### Terminal 2 - Start Frontend Server:

```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:5173**

## 🎮 How to Use

1. Open your browser and navigate to: **http://localhost:5173**

2. **Login Page:**
   - Enter any **Roll Number** (e.g., "MIT001")
   - Enter any **Password** (e.g., "password123")
   - Click "Login"
   
   > **Note:** For demo purposes, any roll number and password combination will work.

3. **Dashboard:**
   - View your overall attendance percentage
   - See subject-wise attendance with beautiful cards
   - Color-coded progress bars (Green ≥85%, Blue ≥75%, Yellow ≥65%, Red <65%)
   - Click "Logout" to return to login page

## 📡 API Endpoints

### POST /api/login
Authenticate user (demo - accepts any credentials)

**Request:**
```json
{
  "roll_no": "MIT001",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "roll_no": "MIT001"
}
```

### GET /api/attendance/:roll_no
Get attendance data for a specific roll number

**Response:**
```json
{
  "success": true,
  "roll_no": "MIT001",
  "overall": 84,
  "subjects": [
    { "name": "Mathematics", "percentage": 82 },
    { "name": "Physics", "percentage": 88 },
    { "name": "Chemistry", "percentage": 91 }
  ]
}
```

## 🎨 Customization

### Change Ports

**Backend (server.js):**
```javascript
const PORT = 5000; // Change to your desired port
```

**Frontend (vite.config.js):**
```javascript
server: {
  port: 5173, // Change to your desired port
}
```

### Update API URL

If you change the backend port, update the frontend:

**frontend/src/components/Login.jsx & Dashboard.jsx:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:YOUR_PORT'
```

### Modify Attendance Data

Edit `backend/server.js` - `generateRandomAttendance()` function to customize:
- Subject names
- Attendance percentage ranges
- Number of subjects

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (up to 767px)

## 🔒 Authentication

Currently, the app accepts any roll number and password combination for demo purposes. To implement real authentication:

1. Add user database/storage
2. Implement password hashing (bcrypt)
3. Add JWT tokens for session management
4. Create middleware for protected routes

## 🌟 Features to Add (Future)

- [ ] Real user authentication
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Calendar view for attendance history
- [ ] Email notifications for low attendance
- [ ] Export attendance as PDF
- [ ] Admin dashboard
- [ ] Multi-user support
- [ ] Attendance graphs and analytics

## 🐛 Troubleshooting

**Port already in use:**
- Backend: Change PORT in `backend/server.js`
- Frontend: Change port in `frontend/vite.config.js`

**Can't connect to backend:**
- Make sure backend is running on port 5000
- Check CORS settings in `backend/server.js`
- Verify API_URL in frontend components

**Module not found:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ for attendance tracking

---

**Need Help?** Check the console logs for error messages or open an issue on GitHub.
