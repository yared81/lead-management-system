# Lead Management System

A simple lead tracking app built with Node.js, Express, Prisma, and Next.js.

## Tech Stack
- Backend: Node.js + Express + Prisma
- Database: PostgreSQL (local) / Neon (production)
- Frontend: Next.js

## Run Locally

### Prerequisites
- Node.js 18+
- PostgreSQL running locally

### 1. Clone the repo
git clone https://github.com/yared81/lead-management-system
cd lead-management-system

### 2. Backend
cd backend
cp .env.example .env
# Edit .env — set DATABASE_URL to your local postgres
npm install
npx prisma migrate dev --name init
node src/index.js

### 3. Frontend
cd ../frontend
cp .env.local.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL=http://localhost:4000
npm install
npm run dev

App runs at http://localhost:3000
