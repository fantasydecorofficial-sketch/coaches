# Fantasy Decor Courses - Registration System

A comprehensive full-stack web application designed to manage course registrations, process payments, and provide detailed analytics for administrators.

## 🚀 Features


### User Features
- **Course Registration**: Seamless registration form with integrated payment processing.
- **Secure Payments**: Integration with **Razorpay** for secure and reliable transactions.
- **Instant Notifications**: Automated **Email** and **WhatsApp** notifications sent immediately after successful registration.
- **Responsive Design**: Fully responsive UI built with **Tailwind CSS** and **Shadcn UI**.


### Admin Features
- **Dashboard**: Real-time analytics showing total revenue, successful/failed registrations, and page visit statistics.
- **Registration Management**: View, search, and filter student registrations.
- **Detailed Insights**: Drill down into individual registration details and transaction history.
- **Secure Access**: Session-based authentication for admin access.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: Express Session & Firebase Admin SDK
- **Payments**: [Razorpay](https://razorpay.com/)
- **Email**: [Nodemailer](https://nodemailer.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

You will also need accounts/keys for:
- **Firebase Project** (with Firestore enabled)
- **Razorpay** (Key ID and Secret)
- **Email Service** (SMTP credentials, e.g., Gmail App Password)

## ⚙️ Installation & Setup

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
SESSION_SECRET=your_super_secret_session_key
FRONTEND_URL=http://localhost:8080

# Firebase Configuration
# You can either provide the path to your service account JSON file OR the JSON content string
FIREBASE_SERVICE_ACCOUNT={"type": "service_account", ...} 
# OR
# GOOGLE_APPLICATION_CREDENTIALS=./path/to/service-account.json

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# WhatsApp Configuration (Optional)
WHATSAPP_API_URL=https://api.whatsapp.provider.com/send
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_INSTANCE_ID=your_instance_id

# Meeting Link
MEETING_LINK=https://meet.google.com/your-meeting-link
```

Start the backend server:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `frontend` directory (if needed, though Vite often uses `.env` for build time vars, runtime config is usually handled via API calls or `vite.config.ts` proxies):
```env
# If you have specific frontend env vars
VITE_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:8080` (or the port shown in your terminal).

## 🔌 API Endpoints

### Public
- `POST /api/create-order`: Initialize a Razorpay order.
- `POST /api/verify-payment`: Verify payment signature and complete registration.
- `POST /api/analytics`: Track user events (page visits, clicks).
- `GET /api/health`: Check server health and service status.

### Admin (Protected)
- `POST /api/admin/login`: Admin authentication.
- `POST /api/admin/logout`: End admin session.
- `GET /api/admin/dashboard`: Get aggregated dashboard stats.
- `GET /api/admin/registrations`: List all registrations with pagination and filters.
- `GET /api/admin/registrations/:id`: Get details of a specific registration.

## 📂 Project Structure
```
courses.fantasydecor/
├── backend/                 # Express.js server
│   ├── server.js            # Main application entry point
│   ├── package.json         # Backend dependencies
│   └── ...
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages (Registration, Admin, etc.)
│   │   ├── App.tsx          # Main React component & Routing
│   │   └── ...
│   ├── package.json         # Frontend dependencies
│   └── ...
└── README.md                # Project documentation
```

## 📄 License

This project is licensed under the ISC License.
