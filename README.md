# Department Notice Board

A web application for the Department of Computer Science and Engineering.
The Express server stores notices in MongoDB, and the React (TypeScript) page
shows them and lets users add new ones.

Course: 24UCS512 - Capstone Project (Assignment 2)

Student: HARNIKA P (711724UCS134)

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Server   | Node.js, Express, Mongoose          |
| Database | MongoDB                             |
| Client   | React 18, TypeScript, Vite          |

## Project Structure

```
notice-board/
├── README.md
├── server/            (Express + MongoDB)
│   ├── index.js       (pages, APIs, MongoDB connection)
│   ├── models/Notice.js
│   ├── package.json
│   └── .env.example
└── client/            (React + TypeScript)
    ├── index.html
    ├── package.json, tsconfig.json, vite.config.ts
    └── src/
        ├── main.tsx
        ├── App.tsx    (list, form, API calls)
        ├── App.css
        ├── types.ts
        └── components/NoticeCard.tsx
```

## Features

**Server**
- `GET /` shows a welcome message.
- `GET /faculty` shows a list of faculty names.
- `POST /api/notices` saves a notice (title and message).
- `GET /api/notices` returns all saved notices, newest first.
- If the title or message is empty, nothing is saved and a `400` error message is returned.

**Client**
- `NoticeCard` component shows one notice, receiving title and message through props.
- Notices are shown as a list, one `NoticeCard` for each.
- A form (title and message) with an **Add** button adds a new notice.
- Notices are loaded from MongoDB when the page opens; new notices are saved and shown at the top.

## How to Run

### Prerequisites
- Node.js 18 or later
- MongoDB running on `mongodb://127.0.0.1:27017`

### 1. Start the server
```bash
cd server
npm install
cp .env.example .env     # optional, defaults are the same
npm start
```
The server runs on http://localhost:5000

### 2. Start the client (in a second terminal)
```bash
cd client
npm install
npm run dev
```

### 3. Open the app
Go to http://localhost:5173

The Vite dev server forwards every request starting with `/api` to the Express
server on port 5000, so no extra setup is needed.

## API Examples

```bash
# Save a notice (201)
curl -X POST http://localhost:5000/api/notices \
  -H "Content-Type: application/json" \
  -d '{"title":"Guest Lecture","message":"15 October, 10:00 AM, Seminar Hall"}'

# Empty title (400)
curl -X POST http://localhost:5000/api/notices \
  -H "Content-Type: application/json" \
  -d '{"title":" ","message":"hello"}'

# Get all notices
curl http://localhost:5000/api/notices
```

## Upload to GitHub

```bash
cd notice-board
git init
git add .
git commit -m "Department Notice Board"
git branch -M main
git remote add origin https://github.com/<your-username>/notice-board.git
git push -u origin main
```
