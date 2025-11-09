import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
firstName: { 
    type: String, 
    required: true 
},
lastName: { 
    type: String, 
    required: true
 },
position: { 
    type: String, 
    required: true 
},
currentPosition: { 
    type: String, 
    required: true 
},
experience: { 
    type: Number, 
    required: true
 },
resumeFilename: String,
resumePath: String,
videoFileId: mongoose.Schema.Types.ObjectId,
createdAt: { 
    type: Date, 
    default: Date.now 
}
});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;