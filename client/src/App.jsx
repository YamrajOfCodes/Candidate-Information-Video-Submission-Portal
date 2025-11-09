import { Routes, Route } from 'react-router-dom';
import CandidateForm from './Components/CandidateForm/CandidateForm';
import VideoRecording from './Components/VideoRecording/VideoRecording';
import Review from './Components/Review/Review';

export default function App() {
  return (
   <div className="d-flex justify-content-center align-items-center" style={{ width: "100vw" }}>
  <div className="w-100">
    <Routes>
      <Route path="/" element={<CandidateForm />} />
      <Route path="/video" element={<VideoRecording />} />
      <Route path="/review" element={<Review />} />
    </Routes>
  </div>
</div>

  );
}
