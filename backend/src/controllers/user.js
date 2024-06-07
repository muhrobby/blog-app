import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/model.js";
import { where } from "sequelize";

const getCurrentTimeStamp = () => {
  return new Date().toString();
};

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      msg: "Password tidak sama",
    });
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const data = {
    name: name,
    email: email,
    password: hash,
  };

  try {
    await User.create(data);
    console.info("User created => " + JSON.stringify(data));
    return res.status(200).json({
      msg: "User Created",
      data: { name, email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error creating user",
      err: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!matchPassword) {
      return res.status(500).json({
        msg: "Password Incorrect",
      });
    }

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const refresh_token = jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "30s",
    });

    await User.update(
      { refresh_token: refresh_token },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.cookie("auth", refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log(
      `[${getCurrentTimeStamp()}]login successfuly => ${JSON.stringify(data)}`
    );
    return res.status(200).json({
      msg: "Login successfuly ",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "email or password wrong",
      });
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(204).json({
      msg: "token is required",
    });
  }
  const user = await User.findOne({
    where: {
      refresh_token: token,
    },
  });

  if (!user) {
    return res.status(403).json({
      msg: "User not found",
    });
  }

  await User.update(
    { refresh_token: null },
    {
      where: {
        id: user.id,
      },
    }
  );

  res.clearCookie("auth");
  res.status(200).json({
    msg: "logout successful",
  });
};

export const showUser = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      msg: "get users successfuly",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "get users error",
      err: error.message,
    });
  }
};
