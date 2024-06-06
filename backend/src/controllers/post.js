import randomstring from 'randomstring';
import slug from 'slug';
import jwt from 'jsonwebtoken';
import { Post, User } from '../models/model.js';


export const create = async (req, res) => {
    
    const token = req.cookies.auth
    if (!token) {
        return res.status(403).json({
            msg : 'Invalid token provided'
        })
    }

    if(!req.file) return res.status(500).json({msg : 'image not found'})

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

        const {title, content} = req.body
        const thumbnail = req.file.path
        const slugTitle = slug(title)
        const postId = new Date().getTime()+randomstring.generate(10)
        const data = {
            title,
            content,
            slug : slugTitle,
            post_id : postId,
            userId : decoded.id,
            thumbnail
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


export const update = async (req, res) => { 
    const token = req.cookies.auth

    if (!token) {
        return res.status(403).json({
            msg : 'token not provided'
        })
    }

    if (!req.file) {
        return res.status(500).json({
            msg : 'image not found',
        })
    }

    
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

        const postId = req.params.postId
        const {title, content} = req.body
        const thumbnail = req.file.path


        const user = await Post.findOne({
            where : {
                post_id : postId,
            }
        });

        if (user.userId !== decoded.id) {
            return res.status(401).json({
                msg :" you not allowed to update this post"
            })
        }

        await Post.update({
            title,
            content,
            slug : slug(title),
            thumbnail
        },{
            where : {
                post_id : postId
            }
        })

        return res.status(200).json({
            msg : 'success to update post',
        })

        
    } catch (error) {
        return res.status(500).json({
            msg : 'error updating post',
            err : error.message
        })
    }
}

export const show = async (req, res) => {

try {
    const posts = await Post.findAll({
        include : [{
            model: User,
            as : 'user',
            attributes : ['name', 'email']
        }]
    });
    return res.status(200).json({
        data : posts
    })
} catch (error) {
    return res.status(500).json({
        msg : 'failed get posts',
        err : error.message
    })
}

}