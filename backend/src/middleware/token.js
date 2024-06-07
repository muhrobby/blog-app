import jwt from "jsonwebtoken";
import { User } from "../models/model.js";

export const token = async (req, res) => {
  const tokenCookies = req.cookies.auth;
  if (!tokenCookies) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }

  try {
    const decoded = jwt.verify(tokenCookies, process.env.SECRET_TOKEN);

    const user = await User.findOne({
      where: {
        refresh_token: tokenCookies,
      },
    });

    if (user.email !== decoded.email) {
      return res.status(403).json({
        msg: "Token does not match",
      });
    }

    return res.status(200).json({
      msg: "Token is valid",
      token: tokenCookies,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "token Invalid",
      err: error.message,
    });
  }
};
