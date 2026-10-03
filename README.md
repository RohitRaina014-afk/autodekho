# AutoDekho — Discover Your Next Drive 🚗💨

> A modern, responsive full-stack **MERN** (MongoDB, Express, React, Node.js) vehicle marketplace web application engineered with clean code, intuitive CRUD workflows, and an automotive design aesthetic.

![AutoDekho Banner](https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80)

---

## 📌 Table of Contents
1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Architecture & Request Flow](#-architecture--request-flow)
4. [Folder Structure](#-folder-structure)
5. [Local Installation & Setup](#-local-installation--setup)
6. [Database Seeding](#-database-seeding)
7. [REST API Endpoints](#-rest-api-endpoints)
8. [Deployment Guide (Vercel + Render + MongoDB Atlas)](#-deployment-guide)
9. [Interview Q&A Cheatsheet](#-interview-qa-cheatsheet)

---

## 🌟 Project Overview

**AutoDekho** is designed as a digital car marketplace bridging prospective automobile buyers with verified private sellers and dealerships across India.

### Key Features:
- **Rich Automotive Homepage:** Large hero section with instant search, category showcase (SUV, Sedan, Electric, Luxury, Hybrid), handpicked featured vehicles, value proposition cards, and live marketplace metrics.
- **Dynamic Vehicle Catalog (`/vehicles`):** Real-time multi-attribute filtering by brand, fuel type, transmission type, body style, and maximum price slider, combined with multi-mode sorting (price low/high, manufacturing year, mileage).
- **Comprehensive Vehicle Details (`/vehicles/:id`):** 2-column layout displaying high-resolution imagery, powertrain metrics, 200-point inspection badge, factory feature checklist, estimated EMI calculator, and interactive lead inquiry form.
- **Full CRUD Management:** Create, read, update (`/edit-vehicle/:id`), and delete listings with confirmation modals. Includes 1-click **Quick Demo Autofill presets** (Tesla, BMW, Defender) for effortless live interview presentations.
- **Persistent Wishlist (`/wishlist`):** LocalStorage-backed bookmarking feature without authentication friction.
- **About Platform & Architecture Showcase (`/about`):** Detailed breakdown of system design, REST specifications, and developer documentation.

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | **React 19 + Vite 8** | High-performance single page application |
| **Routing** | **React Router DOM 7** | Client-side routing with clean URLs |
| **Styling** | **Tailwind CSS v4** | Modern glassmorphism, responsive grid, dark palette |
| **Icons** | **Lucide React** | Lightweight automotive & UI icons |
| **HTTP Client** | **Axios** | RESTful backend communication with base instance |
| **Backend** | **Node.js + Express.js** | Modular REST API with controller-route separation |
| **Database** | **MongoDB + Mongoose** | Schema validation, indexes, and aggregation |
| **Environment**| **Dotenv & CORS** | Config management and cross-origin security |

---

## 🏗 Architecture & Request Flow

```text
       ┌────────────────────────┐
       │   Browser (User UI)    │
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │   React 19 + Vite      │ (Client State & UI)
       └───────────┬────────────┘
                   │
                   ▼  HTTP Requests
       ┌────────────────────────┐
       │      Axios Client      │ (services/api.js)
       └───────────┬────────────┘
                   │  JSON via REST
                   ▼
       ┌────────────────────────┐
       │   Express Server       │ (server.js / port 5000)
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │     Router Layer       │ (routes/vehicleRoutes.js)
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │    Controller Layer    │ (controllers/vehicleController.js)
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │    Mongoose Model      │ (models/Vehicle.js)
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │    MongoDB Database    │ (Local / Atlas Cloud)
       └────────────────────────┘
```

### Complete End-to-End Data Flow (e.g. Adding a Vehicle):
1. **User Action:** User inputs vehicle specs or clicks a Quick Preset on `/add-vehicle`.
2. **Client Validation:** Form checks required fields, positive price, and valid year.
3. **HTTP Dispatch:** Axios sends `POST /api/vehicles` with JSON payload.
4. **Server Routing:** Express matches `POST /api/vehicles` in `vehicleRoutes.js`.
5. **Business Logic:** `vehicleController.js` validates data and calls `Vehicle.create()`.
6. **Persistence:** Mongoose persists the document into MongoDB collection with auto timestamps.
7. **HTTP 201 Response:** Server responds with `{ success: true, data: newVehicle }`.
8. **UI State Transition:** React displays success alert and redirects user to `/vehicles`.

---

## 📂 Folder Structure

```text
autodekho/
├── package.json               # Root scripts for unified build and deployment
├── .gitignore
├── README.md
├── server/                    # Node.js + Express Backend
│   ├── package.json
│   ├── .env                   # Environment variables (PORT, MONGO_URI)
│   ├── .env.example
│   ├── server.js              # Server entry point, middleware & route mounting
│   ├── seed.js                # Database seed script with 10 realistic cars
│   ├── config/
│   │   └── db.js              # Mongoose database connection logic
│   ├── models/
│   │   └── Vehicle.js         # Mongoose Vehicle schema & validation
│   ├── controllers/
│   │   └── vehicleController.js # CRUD handlers & aggregation logic
│   └── routes/
│       └── vehicleRoutes.js   # Express REST endpoints
└── client/                    # React + Vite Frontend
    ├── package.json
    ├── vite.config.js         # Tailwind v4 plugin + API proxy setup
    ├── vercel.json            # Vercel SPA routing rewrite
    ├── index.html             # Google fonts & meta tags
    ├── public/
    │   └── _redirects         # Netlify SPA routing rewrite
    └── src/
        ├── main.jsx
        ├── App.jsx            # Top-level routes & layout wrapper
        ├── index.css          # Tailwind CSS v4 & custom glassmorphism
        ├── services/
        │   └── api.js         # Centralized Axios API methods
        ├── context/
        │   └── WishlistContext.jsx # LocalStorage-backed state context
        ├── utils/
        │   └── formatters.js  # INR Currency & number formatters
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── VehicleCard.jsx
        │   ├── DeleteConfirmModal.jsx
        │   └── ContactSellerModal.jsx
        └── pages/
            ├── Home.jsx
            ├── Vehicles.jsx
            ├── VehicleDetails.jsx
            ├── AddVehicle.jsx
            ├── EditVehicle.jsx
            ├── Wishlist.jsx
            └── About.jsx
```

---

## 🚀 Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) installed locally or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud URI.

### Step 1: Clone or Navigate to the Project
```bash
cd autodekho
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 3: Configure Environment Variables
Inside `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/autodekho
```

### Step 4: Seed Sample Vehicles into MongoDB
Populate the database with 10 realistic, high-resolution vehicle listings (BMW, Mercedes, Audi, Toyota, Tata, etc.):
```bash
node seed.js
```
*(You will see: `MongoDB Connected: 127.0.0.1` and `Successfully seeded 10 vehicles into MongoDB!`)*

### Step 5: Start the Backend Server
```bash
npm run dev
# Or: node server.js
```
*Backend runs on: `http://localhost:5000`*

### Step 6: Install Frontend Dependencies & Start Client
Open a second terminal window:
```bash
cd client
npm install
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 📡 REST API Endpoints

| HTTP Method | Route | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/vehicles` | Get all vehicles (supports `?search=`, `?brand=`, `?fuelType=`, `?sort=`, `?minPrice=`, `?maxPrice=`) | `200`, `500` |
| `GET` | `/api/vehicles/:id` | Get single vehicle details by MongoDB ID | `200`, `400`, `404` |
| `POST` | `/api/vehicles` | Create a new vehicle listing | `201`, `400`, `500` |
| `PUT` | `/api/vehicles/:id` | Update an existing vehicle listing | `200`, `400`, `404` |
| `DELETE` | `/api/vehicles/:id` | Permanently delete a vehicle listing | `200`, `400`, `404` |
| `GET` | `/api/vehicles/stats/summary` | Aggregate metrics (total vehicles, brands, avg price) | `200`, `500` |
| `GET` | `/api/health` | Health check endpoint | `200` |

### Example Vehicle JSON Payload:
```json
{
  "brand": "BMW",
  "model": "3 Series 330i M Sport",
  "year": 2023,
  "price": 4850000,
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "mileage": 14200,
  "location": "Mumbai, Maharashtra",
  "image": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  "engine": "2.0L TwinPower Turbo Inline-4 (255 HP)",
  "category": "Sedan",
  "description": "Single-owner BMW 330i in Dravit Grey with complete service records."
}
```

---

## ☁️ Deployment Guide

You can deploy AutoDekho using either **Option A (Vercel + Render - Recommended)** or **Option B (Unified Single-Service on Render)**.

### Step 1: Create a Free MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. Create a free **M0 Sandbox Cluster**.
3. Under **Database Access**, create a user (e.g. `autodekho_admin` with password).
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere).
5. Click **Connect** &rarr; **Drivers** &rarr; Copy your connection string:
   ```env
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/autodekho?retryWrites=true&w=majority
   ```

---

### Option A: Standard Deployment (Vercel Frontend + Render Backend)

#### Deploy Backend to Render (Free Web Service)
1. Push your code to GitHub.
2. Log into [Render.com](https://render.com) and click **New +** &rarr; **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Under **Environment Variables**, add:
   - `MONGO_URI`: *(Your MongoDB Atlas connection string)*
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: *(Your Vercel frontend URL, or `*`)*
6. Click **Deploy Web Service**.
7. Note down your backend URL (e.g., `https://autodekho-api.onrender.com`).
8. Optional: To seed data on Render, open the **Shell** tab on Render and run `node seed.js`.

#### Deploy Frontend to Vercel
1. Log into [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. In Project Settings:
   - **Root Directory:** select `client`
   - **Framework Preset:** Vite
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://autodekho-api.onrender.com/api`
5. Click **Deploy**.
   *(The included `vercel.json` automatically handles SPA routing rewrites so page reloads on `/vehicles` work perfectly without 404s!)*

---

### Option B: Unified Single-Service Deployment (Express serves Vite React)

The backend `server/server.js` is already coded with production static file serving! In production mode, Express automatically serves the built React app from `client/dist`.

1. In Render, create a **Web Service** with:
   - **Root Directory:** `.` (Repository root)
   - **Build Command:** `npm run install-all && npm run build`
   - **Start Command:** `npm start`
2. Add Environment Variables:
   - `MONGO_URI`: *(Your MongoDB Atlas connection string)*
   - `NODE_ENV`: `production`
3. Click **Deploy**. Both the API (`/api/vehicles`) and UI (`/`) will run seamlessly under a single URL!

---

## 🔮 Future Enhancements
- User Authentication using JWT & bcrypt (Buyer & Seller accounts).
- Image upload via AWS S3 / Cloudinary.
- Test drive scheduling calendar with automated email confirmations.
- Razorpay / Stripe payment gateway integration for booking token amounts.
