import express from "express";
import postRoute from "./routes/posts.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from 'multer';
import { db } from "../db.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.get("/test", (req, res) => {
  // Test your database here
  // You can perform any database operations you want to test
  
  // Example: Fetch all posts from the database
  db.query("SELECT * FROM posts", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Internal Server Error");
    }
    return res.status(200).json(data);
  });
});

app.listen(process.env.PORT || 8800, () => {
  console.log(`Server started on port ${process.env.PORT || 8800}`);
});
