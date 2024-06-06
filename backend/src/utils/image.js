import multer from "multer";
import randomstring from "randomstring";
import path from "path";


export const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, 'images');
    },
    filename : (req,file,cb) => {
        cb(null, new Date().getTime()+randomstring.generate(10)+ path.extname(file.originalname));
    }
})

export const filter = (req,file,cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    }else {
        cb(null, false)
    }
}

export const upload = multer({storage:storage, fileFilter : filter}).single('thumbnail');