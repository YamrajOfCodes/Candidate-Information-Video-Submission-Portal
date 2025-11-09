import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CandidateApply } from '../../Redux/Slices/UserSlice';

export default function CandidateForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    position: '',
    currentPosition: '',
    experience: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return setFile(null);
    if (f.type !== 'application/pdf') return setError('Resume must be a PDF file');
    if (f.size > 5 * 1024 * 1024) return setError('Resume must not exceed 5MB');
    setError('');
    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    for (const key of Object.keys(form)) {
      if (!form[key]) return setError('All fields are required.');
    }
    if (!file) return setError('Please upload your resume.');

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('resume', file);

    try {

       const config = {
        "Content-Type":"multipart/formdata"
      }

      const data = {
        data:fd,
        config
      }

      setLoading(true);
      dispatch(CandidateApply(data)).then((res)=>{
        console.log(res.payload);
        
        if(res.payload){
            navigate('/video', { state: { candidate: res.payload } });
        }
      })
    
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100  d-flex align-items-center py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div className="card shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-header border-0 text-white text-center py-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="mb-2">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="mb-1 fw-bold">Join Our Team</h3>
                <p className="mb-0 opacity-75">Let's start with your basic information</p>
              </div>

              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4" role="alert">
                    <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-secondary">
                        <svg className="me-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                        First Name
                      </label>
                      <input 
                        name="firstName" 
                        className="form-control form-control-lg border-2" 
                        value={form.firstName} 
                        onChange={handleChange}
                        placeholder="John"
                        style={{ borderRadius: '12px' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-secondary">
                        <svg className="me-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                        Last Name
                      </label>
                      <input 
                        name="lastName" 
                        className="form-control form-control-lg border-2" 
                        value={form.lastName} 
                        onChange={handleChange}
                        placeholder="Doe"
                        style={{ borderRadius: '12px' }}
                      />
                    </div>

                  <div className="col-12">
            <label className="form-label fw-semibold text-secondary">
    <svg className="me-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z"/>
      <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z"/>
    </svg>
    Position Applied For
            </label>
  <select 
    name="position" 
    className="form-select form-select-lg border-2" 
    value={form.position} 
    onChange={handleChange}
    style={{ borderRadius: '12px' }}
  >
    <option value="">Select a position...</option>
    <option value="UI/UX Designer">UI/UX Designer</option>
    <option value="Video Editor">Video Editor</option>
    <option value="Software Engineer">Software Engineer</option>
    <option value="Frontend Developer">Frontend Developer</option>
    <option value="DevOps Engineer">DevOps Engineer</option>
    <option value="Mobile App Developer">Mobile App Developer</option>
    <option value="SEO Specialist">SEO Specialist</option>
    <option value="Social Media Manager">Social Media Manager</option>
    <option value="QA Engineer">QA Engineer</option>
  </select>
</div>
                    {/* Current Position */}
                    <div className="col-12">
                      <label className="form-label fw-semibold text-secondary">
                        <svg className="me-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                          <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                        </svg>
                        Current Position
                      </label>
                      <input 
                        name="currentPosition" 
                        className="form-control form-control-lg border-2" 
                        value={form.currentPosition} 
                        onChange={handleChange}
                        placeholder="e.g., Senior Developer, Team Lead"
                        style={{ borderRadius: '12px' }}
                      />
                    </div>

                    {/* Experience */}
                    <div className="col-12">
                      <label className="form-label fw-semibold text-secondary">
                        <svg className="me-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                          <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                          <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                          <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        Years of Experience
                      </label>
                      <input 
                        type="number" 
                        name="experience" 
                        className="form-control form-control-lg border-2" 
                        value={form.experience} 
                        onChange={handleChange}
                        placeholder="5"
                        min="0"
                        style={{ borderRadius: '12px' }}
                      />
                    </div>

                    {/* Resume Upload */}
                    <div className="col-12">
                      <label className="form-label fw-semibold text-secondary">
                        <svg className="me-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                        </svg>
                        Upload Resume
                      </label>
                      <div className="input-group input-group-lg" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <input 
                          type="file" 
                          accept="application/pdf" 
                          className="form-control border-2" 
                          onChange={handleFile}
                          style={{ borderRadius: '12px' }}
                        />
                      </div>
                      <small className="text-muted d-block mt-2">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                        PDF format only, maximum 5MB
                      </small>
                      {file && (
                        <div className="alert alert-success border-0 mt-3 d-flex align-items-center" style={{ borderRadius: '12px' }}>
                          <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                          </svg>
                          <span className="fw-semibold">{file.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <button 
                      className="btn btn-lg text-white fw-semibold shadow" 
                      disabled={loading}
                      style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '12px',
                        border: 'none',
                        padding: '15px'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          Continue to Next Step
                          <svg className="ms-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="card-footer border-0 text-center py-3 bg-light" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <small className="text-muted">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                  Your information is secure and confidential
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}