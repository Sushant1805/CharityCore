# 🎗️ CharityCore - NGO Donation Portal

CharityCore is a secure, modern, and transparent MERN stack application designed to bridge the gap between donors and NGOs. This platform empowers individuals to support global causes with confidence, featuring role-based access control and enterprise-grade security headers.

---

## 🚀 Features

- **🔒 Secure Authentication**: Robust JWT-based authentication system with encrypted password storage.
- **🛡️ Enterprise Security**: Hardened with Helmet.js, custom Content Security Policy (CSP), and anti-clickjacking measures.
- **👑 Role-Based Access**: 
  - **Admin**: Oversee the entire portal, manage donations, and view analytics.
  - **User**: Register, browse causes, and make secure donations.
- **⚡ Modern UI/UX**: Built with React 19, Vite, Tailwind CSS 4, and Lucide icons for a premium, responsive experience.
- **📊 Real-time Dashboard**: Interactive dashboard for tracking donation history and impacts.
- **🌱 Automated Seeding**: Instant admin account creation on the first database connection.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://reactjs.org/), [Vite 8](https://vitejs.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
- **Security**: [Helmet](https://helmetjs.github.io/), [JWT](https://jwt.io/), [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- **Icons**: [Lucide-React](https://lucide.dev/)

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local instance or Atlas)
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sushant1805/CharityCore.git
   cd NGO_DONATION_PORTAL
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory (see [Configuration](#configuration)).

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend** (From the `backend` directory)
   ```bash
   # Run with nodemon
   npx nodemon server.js
   ```

2. **Start the Frontend** (From the `frontend` directory)
   ```bash
   npm run dev
   ```

3. **Access the App**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Configuration

### Backend `.env`
Create a `.env` file in the `backend` folder with the following:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ngo_portal
JWT_SECRET=your_super_secret_key_here
```

---

## 🔑 Initial Admin Credentials

Upon initial setup, the system automatically seeds a primary administrator account.

- **Email**: `admin@cc.com`
- **Password**: `12345678`

> [!WARNING]
> Please change the default admin password immediately after your first login for security purposes.

---

## 🛡️ Security Implementation

CharityCore prioritizes user data and financial security:
- **CSP**: Restricts script execution and source requests.
- **X-Frame-Options**: Prevents clickjacking by denying iframe embedding.
- **X-Content-Type-Options**: Prevents MIME-type sniffing.
- **Proxy**: Utilizes Vite dev proxy to avoid CORS issues and expose a unified origin.

---

## 📄 License

This project is licensed under the **ISC License**.

---

*Made with ❤️ for a better world.*
