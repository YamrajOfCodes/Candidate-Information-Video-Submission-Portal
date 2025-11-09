import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { useDispatch } from 'react-redux';
import { CandidateVideoUpload } from '../../Redux/Slices/UserSlice';

export default function VideoRecording() {
  const location = useLocation();
  const navigate = useNavigate();
  const candidate = location.state?.candidate;
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const maxDuration = 90;
  const timerRef = useRef(null);
  const dispatch= useDispatch();

  useEffect(() => {
    if (!candidate) navigate('/');
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(s);
        videoRef.current.srcObject = s;
      } catch {
        setError('Camera and microphone permissions are required.');
      }
    })();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const startRecording = () => {
    setError('');
    if (!stream) return;
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = e => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setVideoUrl(URL.createObjectURL(blob));
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(time => {
        if (time + 1 >= maxDuration) {
          stopRecording(true);
        }
        return time + 1;
      });
    }, 1000);
  };

  const stopRecording = (auto = false) => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
    clearInterval(timerRef.current);
    if (auto) setError('Recording stopped at 90 seconds.');
  };

  const submitVideo = async () => {
    if (!videoUrl) return setError('Record your video first.');
    const blob = await fetch(videoUrl).then(r => r.blob());
    const fd = new FormData();
    fd.append('video', new File([blob], `video-${candidate.candidate._id}.webm`, { type: 'video/webm' }));

    try {
      setUploading(true);
      const data = {
        data:fd,
        candidateId:candidate.candidate._id
      }

      dispatch(CandidateVideoUpload(data)).then(async (res)=>{
        if(res.payload){
          const updated = await api.get(`/candidates/${candidate.candidate._id}`);
          // Above is another method to call the API, Actually I wanted to show both 
          navigate('/review', { state: { candidate: updated.data.candidate } });

        }
      })
      
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timer / maxDuration) * 100;

  return (
    <div className="min-vh-100 d-flex align-items-center py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div className="card shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-header border-0 text-white text-center py-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="mb-2">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <h3 className="mb-1 fw-bold">Video Introduction</h3>
                <p className="mb-0 opacity-75">Tell us about yourself in 90 seconds</p>
              </div>

              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4" role="alert" style={{ borderRadius: '12px' }}>
                    <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>{error}</div>
                  </div>
                )}

                <div className="alert alert-info border-0 shadow-sm mb-4" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)' }}>
                  <h6 className="fw-bold mb-2 text-dark">
                    <svg className="me-2" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    What to include in your video:
                  </h6>
                  <ul className="mb-0 text-dark small">
                    <li>Brief introduction about yourself</li>
                    <li>Why you're interested in this position</li>
                    <li>Your relevant experience and skills</li>
                    <li>Your career goals and aspirations</li>
                  </ul>
                </div>

             
                <div className="position-relative mb-4">
                  <div className="text-center position-relative" style={{ borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted 
                      className="w-100"
                      style={{ 
                        maxHeight: '500px',
                        objectFit: 'cover',
                        display: videoUrl ? 'none' : 'block'
                      }}
                    />
                    
                    {recording && (
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-danger d-flex align-items-center" style={{ fontSize: '14px', padding: '8px 12px' }}>
                          <span className="spinner-grow spinner-grow-sm me-2" style={{ width: '10px', height: '10px' }}></span>
                          REC
                        </span>
                      </div>
                    )}

                    {!stream && !error && (
                      <div className="position-absolute top-50 start-50 translate-middle text-white">
                        <div className="spinner-border mb-3" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Initializing camera...</p>
                      </div>
                    )}
                  </div>

             
                  {(recording || timer > 0) && (
                    <div className="mt-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-semibold text-secondary">
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                          </svg>
                          {formatTime(timer)}
                        </span>
                        <span className="text-secondary small">{formatTime(maxDuration)}</span>
                      </div>
                      <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ 
                            width: `${progress}%`,
                            background: progress > 80 ? 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)' : 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-flex gap-3 justify-content-center align-items-center mb-4">
                  {!recording && !videoUrl && (
                    <button 
                      className=" d-flex justify-content-center  btn btn-lg text-white fw-semibold shadow-sm px-5"
                      onClick={startRecording}
                      disabled={!stream}
                      style={{ 
                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                        borderRadius: '12px',
                        border: 'none'
                      }}
                    >
                     
                      Start Recording
                    </button>
                  )}

                  {recording && (
                    <button 
                      className="btn d-flex btn-lg text-white fw-semibold shadow-sm px-5"
                      onClick={() => stopRecording(false)}
                      style={{ 
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        borderRadius: '12px',
                        border: 'none'
                      }}
                    >
                      Stop Recording
                    </button>
                  )}

                  {videoUrl && (
                    <button 
                      className="btn btn-lg btn-outline-secondary fw-semibold px-4"
                      onClick={() => {
                        setVideoUrl(null);
                        setTimer(0);
                      }}
                      style={{ borderRadius: '12px' }}
                    >
                      <svg className="me-2" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                      </svg>
                      Re-record
                    </button>
                  )}
                </div>

                {/* Video Preview */}
                {videoUrl && (
                  <div className="mt-4">
                    <h5 className="mb-3 fw-bold text-secondary">
                      <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                        <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                      </svg>
                      Preview Your Recording
                    </h5>
                    <div className="text-center" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                      <video 
                        src={videoUrl} 
                        controls 
                        className="w-100 shadow"
                        style={{ maxHeight: '500px', borderRadius: '16px' }}
                      />
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <button 
                        className="btn btn-lg text-white fw-semibold shadow"
                        onClick={submitVideo}
                        disabled={uploading}
                        style={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '12px',
                          border: 'none',
                          padding: '15px'
                        }}
                      >
                        {uploading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Uploading Video...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <svg className="ms-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

           
              <div className="card-footer border-0 text-center py-3 bg-light" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <small className="text-muted">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                  </svg>
                  Maximum recording time: 90 seconds • Your video is processed securely
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}