import jwt from "jsonwebtoken";
import { User } from "../models/model.js";

export const verifyToken = async (req, res, next) => {
  const authToken = req.header("Authorization");
  const token = authToken && authToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      msg: "token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findOne({
      where: {
        refresh_token: token,
      },
    });

    if (user.email == decoded.email) {
      next();
    } else {
      return res.status(401).json({
        msg: "access token is invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "access token is invalid",
      err: error.message,
    });
  }
};
