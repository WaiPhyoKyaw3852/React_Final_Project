import { CButton, CCard, CCardBody, CCol, CImg, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import React from 'react'
import SuccessError from '../common/SuccessError';

const LoginForm = (props) => {
    let {loginClick,passwordChange,password,userCodeChange,userCode,success,error,restClick,keyDownHandler
        } = props;
  return (
  
    <div
      className="min-vh-100  flex-row align-items-center login-bg"
    >
    <CRow>
  <CCol lg="3"></CCol>
<CCol lg="6">
<CCard className="login" style={{marginTop:"100px"}}
               >
                <CCardBody>
               
                  <CRow alignHorizontal='center'>
                  <CImg src='./image/main-logo.png' width={150} height={150}></CImg>
                  </CRow>
                  <CRow alignHorizontal='center' className="mb-3">
                    <h3 className='login-title'>Registration System</h3>
                  </CRow>
                  <SuccessError success={success} error={error} />
                  <CRow className="mt-4 align-items-center">
                    <CCol lg="4"><CLabel className="form-label">User Code</CLabel></CCol>
                    <CCol lg="8">
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CImg src='./image/user.png' width={20} height={20}></CImg>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput className="login-input" placeholder='Enter User Code' type='text' 
                        autoFocus value={userCode} onChange={userCodeChange} onKeyDown={keyDownHandler}
                        ></CInput>
                      </CInputGroup>
                    </CCol>
                  </CRow>
              <br></br>
              <br></br>
                  <CRow className="align-items-center">
                    <CCol lg="4"><CLabel className="form-label">Password</CLabel></CCol>
                    <CCol lg="8">
                    <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CImg src='./image/password.png' width={20} height={20}></CImg>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput className="login-input" placeholder='Enter Password' type='password'
                         value={password} onChange={passwordChange} onKeyDown={keyDownHandler}
                         ></CInput>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <br></br>
                  <br></br>
                  <CRow>
                    <CCol sm="6" >
                      <CRow>
                        <CCol sm="7"></CCol>
                        <CCol sm="4">
                        <CButton id="login" className='form-btn login-btn' 
                        onClick={loginClick}
                        >Login</CButton>
                        </CCol>
                        <CCol sm="1"></CCol>
                      </CRow>
                    </CCol>
                    <CCol sm="6">
                        <CButton id="rest" className='form-btn login-btn' 
                        onClick={restClick}
                        >Cancel</CButton>
                    </CCol>
                  
                  </CRow>
              
            
                </CCardBody>
              </CCard>

</CCol>

  <CCol lg="3"></CCol>
    </CRow>
    </div>
            
  )
}

export default LoginForm
