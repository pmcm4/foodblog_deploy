import express from "express"
import { addComment, addPost, deleteComment, deletePost, getAdminPosts, getLikedPosts, getLikedStatus, getPost, getPostComments, getPosts, getSearchPosts, likePost, unlikePost, updatePost } from "../controller/post.js"

const router = express.Router()


router.get("/search/searchmoto", getSearchPosts);
router.get("/admin/:id", getAdminPosts);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.post("/:id/like", likePost);
router.post("/:id/unlike", unlikePost); 
router.get("/:id/likedStatus", getLikedStatus);
router.get("/user/:id", getLikedPosts);


// Add the comment routes
router.get("/:id/getComments", getPostComments);
router.post("/:id/comment", addComment);
router.delete("/:id/deleteComment/:commentId", deleteComment);


//search


export default router
