import express from "express";
import { Home } from "../controllers/home.js";
import { login, logout, register, showUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { token } from "../middleware/token.js";
import {
  create,
  deletePost,
  show,
  showByUser,
  update,
} from "../controllers/post.js";
import { upload } from "../utils/image.js";

const router = express.Router();

router.get("/", Home);

// USER
const userRouter = express.Router();
userRouter.get("/users", verifyToken, showUser);
userRouter.get("/token", token);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.delete("/logout", logout);

// POST
const postRouter = express.Router();
postRouter.post("/post/create", upload, create);
postRouter.post("/post/update/:postId", upload, update);
postRouter.get("/posts", show);
postRouter.get("/postUser",verifyToken,showByUser);
postRouter.delete("/post/:postId", deletePost);

router.use("/api", userRouter);
router.use("/api", postRouter);

export default router;
