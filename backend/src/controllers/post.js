import randomstring from 'randomstring';
import slug from 'slug';
import jwt from 'jsonwebtoken';
import { Post } from '../models/model.js';


export const create = async (req, res) => {

    const token = req.cookies.auth
    if (!token) {
        return res.status(403).json({
            msg : 'Invalid token provided'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

        const {title, content} = req.body
    
        const slugTitle = slug(title)
        const postId = new Date().getTime()+randomstring.generate(10)
        const data = {
            title,
            content,
            slug : slugTitle,
            post_id : postId,
            userId : decoded.id
        }
    
    await Post.create(data)
        return res.status(200).json({
            msg : "success creating post",
            data : data,
        })

    } catch (error) {
        return res.status(500).json({
            msg : "failed to create post",
            err : error.message
        })
    }
   

}