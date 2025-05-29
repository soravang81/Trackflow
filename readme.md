

### 📁 Folder Structure

```
/delivery-tracker-app
│
├── backend/                     # Node.js + Express + Prisma backend
│   ├── prisma/                  # Prisma schema + migrations
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── socket/
│   │   └── index.ts            # Entry point
│   └── package.json
│
├── frontend/                    # Next.js + TypeScript frontend
│   ├── pages/
│   │   ├── auth/
│   │   ├── vendor/
│   │   ├── delivery/
│   │   └── customer/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── package.json
│
├── README.md                    # Project overview
└── .gitignore
```

---

### 📄 `README.md` Template

````md
# 🛵 Real-Time Delivery Tracker

A full-stack multivendor real-time delivery tracker inspired by Rapido/Dunzo.

## 🚀 Tech Stack

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript + Prisma
- **Database:** PostgreSQL
- **Real-Time:** Socket.IO
- **Maps:** Leaflet.js (OpenStreetMap)
- **Auth:** JWT-based

---

## 📸 Features

### 👨‍🍳 Vendor
- View list of orders
- Assign delivery partner to an order
- Track order status

### 🛵 Delivery Partner
- Login and see assigned order
- Start delivery → real-time location updates sent every 3s

### 👤 Customer
- Track delivery partner live on a map

---

## 🧱 Architecture

```plaintext
[Vendor]        [Delivery Partner]         [Customer]
   |                    |                        |
   |-- REST API ------- |                        |
   |                    |-- Send Loc --------->  |
   |                    |     (every 3s via WS)  |
   |<------ Assign Order via REST ---------------|
   |<---------------- Real-time Tracking --------|
````

* Backend pushes updates via **WebSocket (Socket.IO)**
* Frontend subscribes to **order room** to get live location

---

## 🔐 Authentication

All users authenticate using JWT tokens:

* Stored in `localStorage`
* Sent via Authorization headers

---

## 🛠 Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/yourusername/delivery-tracker-app.git
cd delivery-tracker-app
```

### 2. Backend Setup

```bash
cd backend
npm install

# Setup PostgreSQL .env
cp .env.example .env
npx prisma migrate dev
npx prisma generate
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Environment Variables

### 🖥️ Backend (`.env`)

```env
PORT=your_backend_port
FRONTEND_URL=http://localhost:3000

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require

DECRYPTION_KEY=your_decryption_key
```

---

### 💻 Frontend (`.env.local`)

```env
NEXTAUTH_SECRET=your_nextauth_secret
BACKEND_URL=http://localhost:3001
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
```

---

## 📦 API Endpoints

### 🔐 Authentication

* `POST /auth/customer/signup` – Customer signup
* `POST /auth/customer/login` – Customer login
* `POST /auth/vendor/signup` – Vendor signup
* `POST /auth/vendor/login` – Vendor login
* `POST /auth/delivery/signup` – Delivery partner signup
* `POST /auth/delivery/login` – Delivery partner login

---

### 📦 Orders (Vendor)

* `GET /orders/vendor` – Fetch all orders placed by the vendor
* `POST /orders/vendor/create` – Create a dummy order (for testing/demo)
* `POST /orders/assign` – Assign a delivery partner to an order

---

### 🚚 Delivery Partner

* `GET /orders/delivery/assigned` – Get the order assigned to a delivery partner
* `POST /location/update` – Update the current location of the delivery partner

---

### 👤 Customer

* `GET /orders/customer` – Get all orders placed by the logged-in customer
* `GET /location/:orderId` – Fetch current live location of an order (for customer view)

---

### 🗺️ Location (Generic)

* `POST /location/set` – Set location for an order (used when creating test data or assigning)

---

