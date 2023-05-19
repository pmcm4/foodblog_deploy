import { db } from "../db.js";
import jwt from "jsonwebtoken";
import moment from 'moment';

export const getAdminPosts = (req, res) => {
  const q = req.params.id ? "SELECT * FROM posts WHERE uid = ?" : "SELECT * FROM posts";
  console.log("adminposts");
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};



export const getPostComments = (req, res) => {
  const q = req.params.id 
  ? "SELECT comment.*, users.username, users.img AS userImage FROM comment JOIN users ON comment.uid = users.id WHERE pid = ?" 
  : "SELECT * FROM comments";

  console.log("getting comments");
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

// Controller function to get liked posts with image
export const getLikedPosts = (req, res) => {
  const q = `
    SELECT posts.img, posts.id
    FROM posts
    INNER JOIN likeDB ON posts.id = likeDB.pid
    WHERE likeDB.uid = ?
  `;
  console.log("getting likes")
  
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};


export const getSearchPosts1 = async (sc) => {
  console.log("search!")
  try {
    const q = `SELECT posts.*, users.username, users.img as userImg 
               FROM posts JOIN users ON posts.uid = users.id
               WHERE posts.title LIKE ? OR posts.content LIKE ?`;
    const query = `%${sc}%`;
    
    const results = await db.query(q, [query, query]);
    // Process and return search posts data
    return results;
  } catch (error) {
    console.error('Error fetching search posts:', error);
    throw new Error('Failed to fetch search posts');
  }

};
export const getSearchPosts = (req, res) => {
  const q = "SELECT posts.*, users.username, users.img as userImg FROM posts JOIN users ON posts.uid = users.id WHERE posts.title LIKE ? OR posts.desc LIKE ?";
  const query = `%${req.query.sc}%`;

  console.log("search");

  db.query(q, [query, query], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};


export const getPosts = (req, res) => {
  const q = req.query.cat
  ? "SELECT posts.*, users.username, users.img as userImg FROM posts JOIN users ON posts.uid = users.id WHERE cat = ?"
  : "SELECT posts.*, users.username, users.img as userImg FROM posts JOIN users ON posts.uid = users.id";
  
  console.log("hello");

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });

};

export const getAllNotif = (req, res) => {
  console.log("getting notif...");

  const q = "SELECT n.*, u.username, p.img AS post_image, u.img AS user_image FROM notif n JOIN users u ON n.userID = u.id JOIN posts p ON n.postID = p.id WHERE p.uid = ? AND n.userID <> p.uid ORDER BY n.date DESC";

  
  const userId = req.params.user_id; // Assuming you have the authenticated user's ID
  
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};


export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, `likes`, `uid`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created");
    });
  });
};

export const addLikeNotif = (req, res) => {
  console.log("like notif comms")
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO notif(`userID`, `postID`, `date`, `likeID`, `passage`) VALUES (?)";

    const values = [
      req.body.currentUserID,
      req.body.postId,
      req.body.date,
      req.body.latestLike,
      req.body.passage,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Notif has been created");
    });
  });
};

export const addCommentNotif = (req, res) => {
  console.log("like notif comms")
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO notif(`userID`, `postID`, `date`, `commentID`, `passage`) VALUES (?)";

    const values = [
      req.body.currentUserID,
      req.body.postId,
      req.body.date,
      req.body.latestcomment,
      req.body.passage,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Notif has been created");
    });
  });

  
};

export const deletelikeNotif = (req, res) => {
  console.log("delete notif comms")
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.postID;
    const likeId = req.params.likeID
    const q = "DELETE FROM notif WHERE `postID` = ? AND `likeID` = ?";

    db.query(q, [postId, likeId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("notif like deleted has been deleted!");
    });
  });
};


export const addComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");
  console.log("ccomms")

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log("comment notify")
    const q =
      "INSERT INTO comment(`pid`, `uid`, `commentData`, `date`) VALUES (?, ?, ?, ?)";

    const values = [
      req.params.id, // Assuming you want to use the post ID from the URL parameter
      userInfo.id,
      req.body.comment,
      req.body.date,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Comment has been posted");
    });
  });


};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const deleteNotif = (req, res) => {
  console.log("delete Notif comms")
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.postID;
    const likeId = req.params.likeID;
    const q = "DELETE FROM notif WHERE `postID` = ? AND `idnotif` = ?";

    db.query(q, [postId, likeId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Notif has been deleted!");
    });
  });
};



export const getLatestLike = (req, res) => {
  console.log("latest id like comms")
  const q =
    "SELECT idlike FROM likedb ORDER BY idlike DESC LIMIT 1";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const getLatestComment = (req, res) => {
  console.log("latest id comment comms")
  const q =
    "SELECT id FROM comment ORDER BY id DESC LIMIT 1";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  console.log("delete comment comms");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const commentId = req.params.commentId;

    // Delete the comment from the comment table
    const deleteCommentQuery = "DELETE FROM comment WHERE `pid` = ? AND `uid` = ? AND `id` = ?";
    db.query(deleteCommentQuery, [postId, userInfo.id, commentId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your comment!");

      // Delete the corresponding comment notification
      const deleteNotificationQuery = "DELETE FROM `notif` WHERE `postID` = ? AND `userID` = ? AND `commentID` = ?";
      db.query(deleteNotificationQuery, [postId, userInfo.id, commentId], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Internal Server Error");
        }

        return res.json("Comment has been deleted!");
      });
    });
  });
};


export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};

export const likePost = (req, res) => {
  const postId = req.params.id;
  const token = req.cookies.access_token;
  let userId;
  const datenow = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

  // Retrieve user ID from the authentication token
  try {
    const decodedToken = jwt.verify(token, "jwtkey");
    userId = decodedToken.id;
  } catch (err) {
    return res.status(403).json("Token is not valid!");
  }

  // Check if the user has already liked the post
  db.query(
    "SELECT * FROM `likeDB` WHERE pid = ? AND uid = ?",
    [postId, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
      }

      if (result.length > 0) {
        // User has already liked the post, so return success response
        return res.status(200).json("Post already liked");
      }

      // User hasn't liked the post, so insert a new like entry
      db.query(
        "INSERT INTO `likeDB` (pid, uid, date) VALUES (?, ?, ?)",
        [postId, userId, datenow],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Internal Server Error");
          }

          // Update the likeCount in the posts table
          db.query(
            "UPDATE posts SET likes = likes + 1 WHERE id = ?",
            [postId],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json("Internal Server Error");
              }

              // Return success response
              return res.status(200).json("Post liked");
            }
          );
          
        }
      );
    }
  );
};

export const unlikePost = (req, res) => {
  const postId = req.params.id;
  const token = req.cookies.access_token;
  let userId;

  // Retrieve user ID from the authentication token
  try {
    const decodedToken = jwt.verify(token, "jwtkey");
    userId = decodedToken.id;
  } catch (err) {
    return res.status(403).json("Token is not valid!");
  }

  // Check if the user has liked the post
  db.query(
    "SELECT * FROM `likeDB` WHERE pid = ? AND uid = ?",
    [postId, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
      }

      if (result.length === 0) {
        // User hasn't liked the post, so return success response
        return res.status(200).json("Post not liked");
      }

      // User has liked the post, so delete the like entry
      db.query(
        "DELETE FROM `likeDB` WHERE pid = ? AND uid = ?",
        [postId, userId],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Internal Server Error");
          }

          // Delete the corresponding notification
          db.query(
            "DELETE FROM `notif` WHERE postID = ? AND userID = ?",
            [postId, userId],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json("Internal Server Error");
              }

              // Update the likeCount in the posts table
              db.query(
                "UPDATE posts SET likes = likes - 1 WHERE id = ?",
                [postId],
                (err) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json("Internal Server Error");
                  }

                  // Return success response
                  return res.status(200).json("Post unliked");
                }
              );
            }
          );
        }
      );
    }
  );
};



export const getLikedStatus = (req, res) => {
  const postId = req.params.id;
  const token = req.cookies.access_token;
  let userId;
  console.log("checked")

  // Retrieve user ID from the authentication token
  try {
    const decodedToken = jwt.verify(token, "jwtkey");
    userId = decodedToken.id;
  } catch (err) {
    return res.status(403).json("Token is not valid!");
  }

  // Check if the user has liked the post
  db.query(
    "SELECT * FROM `likeDB` WHERE pid = ? AND uid = ?",
    [postId, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
      }

      if (result.length > 0) {
        // User has liked the post
        return res.status(200).json({ liked: true });
      } else {
        // User hasn't liked the post
        return res.status(200).json({ liked: false });
      }
    }
  );
};


