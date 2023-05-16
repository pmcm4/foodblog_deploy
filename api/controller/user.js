import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const updateUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
        console.log("update user comms")
      const userId = req.params.id;
      const q =
        "UPDATE users SET `name`=?,`username`=?,`bio`=?, `img`=? WHERE `id` = ?";
  
      const values = [req.body.name, req.body.uname,  req.body.bbio, req.body.img];
  
      db.query(q, [...values, userId,], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
      });
    });
  };

  export const getUser = (req, res) => {
    const q =
      "SELECT * FROM users WHERE id = ?";
    console.log("user request comms")
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data[0]);
    });
  };
  