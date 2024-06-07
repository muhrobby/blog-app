import express from "express";
import cors from 'cors';
import router from "./router/router.js";
import { db } from "./config/database.js";
import cookieParser from "cookie-parser";
import { Post } from "./models/model.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  await db.authenticate();
  console.log("database connected");
} catch (error) {
  console.log("database error: " + error);
}

// await User.sync();
// await Post.sync();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials:true,
  origin : 'http://localhost:3000'
}))
app.use(router);
app.use("/images", express.static(path.join(__dirname, "../images")));
app.listen(4000);
console.info("listening on http://localhost:4000");
