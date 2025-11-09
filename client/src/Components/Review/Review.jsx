import { useLocation } from 'react-router-dom';

export default function Review() {
  const { state } = useLocation();
  const candidate = state?.candidate;
  
  if (!candidate) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="card shadow-lg border-0" style={{ borderRadius: '20px', maxWidth: '500px' }}>
          <div className="card-body p-5 text-center">
            <svg width="60" height="60" fill="#f5576c" viewBox="0 0 16 16" className="mb-3">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <h4 className="mb-2">No Candidate Data</h4>
            <p className="text-muted mb-4">Please restart the application process.</p>
            <a href="/" className="btn btn-primary" style={{ borderRadius: '12px' }}>Start Over</a>
          </div>
        </div>
      </div>
    );
  }

  const resumeUrl = `http://localhost:4000${candidate.resumePath}`;
  const videoUrl = `http://localhost:4000/candidate/api/video/${candidate.videoFileId}`;

  return (
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div className="alert border-0 shadow-lg mb-4 text-center" style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white' }}>
              <div className="mb-2">
                <svg width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
              </div>
              <h4 className="mb-1 fw-bold">Application Submitted Successfully!</h4>
              <p className="mb-0 opacity-75">Thank you for applying. Please review your information below.</p>
            </div>

            <div className="card shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-header border-0 text-white text-center py-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="mb-2">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="mb-1 fw-bold">Application Review</h3>
                <p className="mb-0 opacity-75">Your complete application details</p>
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="mb-5">
                  <h5 className="fw-bold mb-4 pb-2" style={{ borderBottom: '3px solid #667eea' }}>
                    <svg className="me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    Personal Information
                  </h5>
                  
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="p-3 rounded-3 h-100" style={{ background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)' }}>
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <svg width="20" height="20" fill="#00838f" viewBox="0 0 16 16">
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                          </div>
                          <div>
                            <small className="text-muted d-block mb-1">First Name</small>
                            <strong className="text-dark">{candidate.firstName}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-3 h-100" style={{ background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)' }}>
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <svg width="20" height="20" fill="#00838f" viewBox="0 0 16 16">
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                          </div>
                          <div>
                            <small className="text-muted d-block mb-1">Last Name</small>
                            <strong className="text-dark">{candidate.lastName}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-3 h-100" style={{ background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' }}>
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <svg width="20" height="20" fill="#6a1b9a" viewBox="0 0 16 16">
                              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z"/>
                              <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z"/>
                            </svg>
                          </div>
                          <div>
                            <small className="text-muted d-block mb-1">Position Applied For</small>
                            <strong className="text-dark">{candidate.position}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-3 h-100" style={{ background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <svg width="20" height="20" fill="#e65100" viewBox="0 0 16 16">
                              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                            </svg>
                          </div>
                          <div>
                            <small className="text-muted d-block mb-1">Current Position</small>
                            <strong className="text-dark">{candidate.currentPosition}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="p-3 rounded-3" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <svg width="20" height="20" fill="#2e7d32" viewBox="0 0 16 16">
                              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                          </div>
                          <div>
                            <small className="text-muted d-block mb-1">Years of Experience</small>
                            <strong className="text-dark fs-4">{candidate.experience} {candidate.experience === 1 ? 'Year' : 'Years'}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Section */}
                <div className="mb-5">
                  <h5 className="fw-bold mb-4 pb-2" style={{ borderBottom: '3px solid #667eea' }}>
                    <svg className="me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                      <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                      <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg>
                    Resume
                  </h5>
                  
                  <div className="p-4 rounded-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' }}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <svg width="40" height="40" fill="#c2185b" viewBox="0 0 16 16">
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                            <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
                          </svg>
                        </div>
                        <div>
                          <strong className="d-block text-dark">Resume.pdf</strong>
                          <small className="text-muted">Click to download your resume</small>
                        </div>
                      </div>
                      <a 
                        href={resumeUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn text-white fw-semibold shadow-sm"
                        style={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '12px',
                          border: 'none'
                        }}
                      >
                        <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                </div>

                {/* Video Section */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-4 pb-2" style={{ borderBottom: '3px solid #667eea' }}>
                    <svg className="me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                      <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                    </svg>
                    Video Introduction
                  </h5>
                  
                  {videoUrl ? (
                    <div className="rounded-3 overflow-hidden shadow">
                      <video 
                        src={videoUrl} 
                        controls 
                        className="w-100"
                        style={{ maxHeight: '500px', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className="alert border-0 shadow-sm d-flex align-items-center" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
                      <svg className="me-3" width="24" height="24" fill="#e65100" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                      <div className="text-dark">
                        <strong>No video uploaded</strong>
                        <p className="mb-0 small">A video introduction was not provided with this application.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card-footer border-0 text-center py-4 bg-light" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <p className="text-muted mb-3">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  Your application has been successfully submitted
                </p>
                <small className="text-muted">We'll review your application and get back to you soon.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}