import Candidate from "../../Model/Candidate/candidateInfoSchema.js";
import formidable from 'formidable';
import fs from "fs";
import { getGfsBucket } from '../../Db/dbconnect.js';
import mongoose from "mongoose";

export const candidateApply =  async (req, res) => {
 try {
const { firstName, lastName, position, currentPosition, experience } = req.body;


if (!firstName || !lastName || !position || !currentPosition || !experience) {
if (req.file) fs.unlinkSync(req.file.path);
return res.status(400).json({ error: 'All fields are required' });
}


if (!req.file) return res.status(400).json({ error: 'Resume is required' });


const candidate = new Candidate({
firstName,
lastName,
position,
currentPosition,
experience: Number(experience),
resumeFilename: req.file.filename,
resumePath: `/candidate_uploads/${req.file.filename}`
});


await candidate.save();
res.json({ message: 'Candidate saved', candidate });
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
};

// video upload gridfs

export const uploadVideo = async(req,res)=>{
  try {
    const gfsBucket = getGfsBucket(); 
    const candidateId = req.params.id;
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(400).json({ error: 'Invalid form data' });

      const file = files.video?.[0] || files.video;
      if (!file) return res.status(400).json({ error: 'No video file provided' });

      const filePath = file.filepath || file.path;
      if (!filePath) return res.status(400).json({ error: 'Invalid file path' });

      const maxBytes = 100 * 1024 * 1024; // 100MB
      if (file.size > maxBytes) return res.status(400).json({ error: 'Video too large' });

      const readStream = fs.createReadStream(filePath);
      const uploadStream = gfsBucket.openUploadStream(`${Date.now()}-${file.originalFilename}`, {
        contentType: file.mimetype || 'video/webm'
      });

      readStream.pipe(uploadStream)
        .on('error', (e) => {
          console.error('GridFS upload error:', e);
          res.status(500).json({ error: 'Failed to store video' });
        })
        .on('finish', async () => {
          await Candidate.findByIdAndUpdate(candidateId, { videoFileId: uploadStream.id });
          res.json({ message: 'Video uploaded', videoId: uploadStream.id });
          try { fs.unlinkSync(filePath); } catch (e) { console.warn('Temp cleanup failed:', e.message); }
        });
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }

}


// getstrim video


export const getStrimVideo = async (req, res) => {
    try {
    const gfsBucket = getGfsBucket();
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid video ID" });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const db = mongoose.connection.db;
    const fileDoc = await db.collection("videos.files").findOne({ _id: objectId });

    if (!fileDoc) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.setHeader("Content-Type", fileDoc.contentType || "video/webm");
    const downloadStream = gfsBucket.openDownloadStream(objectId);

    downloadStream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).json({ error: "Error reading video" });
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error("Video retrieval error:", err);
    res.status(500).json({ error: err.message });
  }
};

// get candidate

export const getCandidate = async(req,res)=>{
  try {
const candidate = await Candidate.findById(req.params.id);
if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
res.json({ candidate });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
}
