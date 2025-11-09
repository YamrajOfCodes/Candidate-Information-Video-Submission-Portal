import { Router } from "express";
const router  = Router();
import { candidateApply,uploadVideo,getStrimVideo,getCandidate } from "../../Controller/Candidate/candidateApplyController.js";
import resumeStorage from "../../Multer/CandidateResume/candidateResume.js";

router.post("/apply",resumeStorage.single("resume"),candidateApply);
router.post("/candidates/:id/video",uploadVideo);

router.get("/video/:id",getStrimVideo);
router.get("/candidates/:id",getCandidate);




export default router;