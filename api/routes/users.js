import express from "express"
import { getPost} from "../controller/post.js"
import { getUser, updateUser } from "../controller/user.js";


const router = express.Router()

router.get("/:id", getPost);
router.put("/:id", updateUser);
router.get("/getuser/:id", getUser);

export default router