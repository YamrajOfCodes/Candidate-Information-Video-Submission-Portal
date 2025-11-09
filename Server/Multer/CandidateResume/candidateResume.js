import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./candidate_uploads")
    },
    filename:(req,file,callback)=>{
        const filename=`file-${Date.now()}.${file.originalname}`;
        callback(null,filename)
    }
})


const filter=(req,file,callback)=>{
   if (file.mimetype === "application/pdf") callback(null, true);
   else callback(new Error("Only PDF files allowed"), false);

}

const upload=multer({
    storage:storage,
    limits: { fileSize  :  5 * 1024 * 1024 },
    fileFilter:filter
})

export default upload;