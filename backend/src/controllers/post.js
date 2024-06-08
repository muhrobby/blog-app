import randomstring from "randomstring";
import slug from "slug";
import jwt from "jsonwebtoken";
import { Post, User } from "../models/model.js";
import { token } from "../middleware/token.js";

export const create = async (req, res) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.status(403).json({
      msg: "Invalid token provided",
    });
  }

  if (!req.file) return res.status(500).json({ msg: "image not found" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    const { title, content } = req.body;
    const thumbnail = req.file.path;
    const slugTitle = slug(title);
    const postId = new Date().getTime() + randomstring.generate(10);
    const data = {
      title,
      content,
      slug: slugTitle,
      post_id: postId,
      userId: decoded.id,
      thumbnail,
    };

    await Post.create(data);
    return res.status(200).json({
      msg: "success creating post",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "failed to create post",
      err: error.message,
    });
  }
};

export const update = async (req, res) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(403).json({
      msg: "token not provided",
    });
  }

  if (!req.file) {
    return res.status(500).json({
      msg: "image not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    const postId = req.params.postId;
    const { title, content } = req.body;
    const thumbnail = req.file.path;

    const user = await Post.findOne({
      where: {
        post_id: postId,
      },
    });

    if (user.userId !== decoded.id) {
      return res.status(401).json({
        msg: " you not allowed to update this post",
      });
    }

    await Post.update(
      {
        title,
        content,
        slug: slug(title),
        thumbnail,
      },
      {
        where: {
          post_id: postId,
        },
      }
    );

    return res.status(200).json({
      msg: "success to update post",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error updating post",
      err: error.message,
    });
  }
};

export const show = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });
    return res.status(200).json({
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "failed get posts",
      err: error.message,
    });
  }
};

export const showById = async (req, res) => {
  const id = req.params.id
  const token = req.cookies.auth
  if (!token) {
    return res.status(403).json({
     msg: "token is required",
   });
 }

  try {

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

    const post = await Post.findOne({where : {
      post_id : id
    }

    })
    if (!post) {
      return res.status(500).json({
        msg : "failed to get data",
        err : error.message
    })
    }

    if (post.userId !== decoded.id) {
      return res.status(403).json({
        msg : 'you are not allowed to Show Data'
      })
    }

    return res.status(200).json({
      msg : "success get data",
      data : post,
      user : {
        name: decoded.name,
        email : decoded.email
      }
    })
  } catch (error) {
    
    return res.status(500).json({
      msg : "failed to get data",
      err : error.message
  })
}

}

export const showByUser = async (req, res) => {
  const token = req.cookies.auth;
  if (!token) {
     return res.status(403).json({
      msg: "token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    if (!decoded) {
      return res.status(403).json({
        msg: "token not valid",
      });
    }
    const posts= await Post.findAll({include : {
      model: User,
      as : 'user',
      attributes : ['name','email'],
      where : {
        id : decoded.id
      }
    }
    });

    return res.status(200).json({
      msg: `success get post ${decoded.name}`,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `failed get post`,
      err: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.status(403).json({
      msg: "token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (!decoded) {
      return res.status(403).json({
        msg: "token not valid",
      });
    }

    const post = await Post.findOne({
      where: {
        post_id: req.params.postId,
      },
    });

    if (post.userId !== decoded.id) {
      return res.status(401).json({
        msg: " you not allowed to delete this post",
      });
    }

    await Post.destroy({
      where: {
        post_id: req.params.postId,
      },
    });

    return res.status(200).json({
      msg: "post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error deleting post",
      err: error.message,
    });
  }
};
