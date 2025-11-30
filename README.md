
# Fullstack Blog Blueprint (Express + React)

This scaffold includes a working backend (Express + MongoDB) and a frontend (React + Vite).
It implements registration/login (JWT), posts CRUD, pagination, search, and a simple UI with smooth animations.

## Quickstart (local)

### Backend
1. cd server
2. npm install
3. copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`
4. npm run seed   # optional to add demo users/posts
5. npm run dev

### Frontend
1. cd client
2. npm install
3. npm run dev
4. Open http://localhost:5173

## Notes
- Default seed creates users: `alice` and `bob` with password `password123`
- Frontend expects API at `http://localhost:4000/api` (change via Vite env if needed)

Enjoy!

