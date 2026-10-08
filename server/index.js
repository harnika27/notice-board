require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Notice = require("./models/Notice");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/noticeboard";

app.use(cors());
app.use(express.json());

// ---------- Part A.1 : two pages ----------

// "/" shows a welcome message
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Department Notice Board</h1>
    <p>Department of Computer Science and Engineering</p>
    <p><a href="/faculty">View faculty list</a></p>
  `);
});

// "/faculty" shows a list of faculty names
const facultyNames = [
  "Dr. R. Karthikeyan",
  "Dr. S. Meenakshi",
  "Mr. P. Arun Kumar",
  "Ms. K. Divya",
  "Mr. V. Sathish",
  "Ms. M. Priyanka",
];

app.get("/faculty", (req, res) => {
  const items = facultyNames.map((name) => `<li>${name}</li>`).join("");
  res.send(`
    <h1>Faculty List</h1>
    <ul>${items}</ul>
    <p><a href="/">Back to home</a></p>
  `);
});

// ---------- Part A.3 : APIs ----------

// POST /api/notices : save a notice (title and message)
app.post("/api/notices", async (req, res) => {
  try {
    const { title, message } = req.body || {};

    // Part A.4 : do not save when title or message is empty
    if (
      typeof title !== "string" ||
      typeof message !== "string" ||
      title.trim() === "" ||
      message.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Title and message are required and cannot be empty." });
    }

    const notice = await Notice.create({
      title: title.trim(),
      message: message.trim(),
    });
    res.status(201).json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save the notice." });
  }
});

// GET /api/notices : return all saved notices (newest first)
app.get("/api/notices", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load the notices." });
  }
});

// ---------- Part A.2 : connect to MongoDB, then start the server ----------
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
