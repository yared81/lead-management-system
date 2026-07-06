# Lead Management System

A full-stack Lead Management application built as a technical assessment. It features a Node.js/Express backend, a Next.js frontend, and a PostgreSQL database managed via Prisma.

## Live Demo 
- **Frontend**: https://lead-management-system-w.vercel.app/
- **Backend API**: https://lead-management-system-j3sm.onrender.com

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL (Hosted on Neon)

## Extra Features Implemented
While keeping the core requirements simple, I added a few quality-of-life improvements to demonstrate production readiness:
- **Client-side filtering**: Search by name/email and filter by status instantly.
- **Extended API**: Added `PATCH` and `DELETE` endpoints to support editing and removing leads.
- **UX Polish**: Added slide-in toast notifications, a delete confirmation modal, and interactive stats cards.
- **Database Optimization**: Added B-Tree indexing on the `status` column for faster filtering queries.

---

## How to Run Locally

### 1. Database Setup
Ensure you have PostgreSQL installed and running locally. Create a database (e.g., `leads_db`).

### 2. Backend Setup
Navigate into the backend directory and configure your environment:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder using the provided example:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/leads_db?schema=public"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```
Run migrations to set up your tables, then start the server:
```bash
npx prisma migrate dev
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and start the app:
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend` folder:
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```
Start the development server:
```bash
npm run dev
```
The application will be running at `http://localhost:3000`.
