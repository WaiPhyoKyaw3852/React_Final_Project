import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CRow,
  CSelect
} from '@coreui/react'
import { useHistory } from 'react-router'
import DatePicker from '../../common/datepicker/DatePicker';
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import { ApiRequest } from "../../common/ApiRequest";
import moment from "moment";
import { nullChk, validateName, emailChk } from '../../common/CommonValidation';
import { validate } from '@material-ui/pickers';
import Confirmation from "../../common/Confirmation";
import ResultClickModel from "./ResultClickModel";
const EmployeeRegistrationIndex = () => {
  const history = useHistory();
  const [genderData, setGenderData] = useState([
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" },
  ]);
  const [englishSkillData, setEnglishSkill] = useState([
    { id: "1", name: "Elementary" },
    { id: "2", name: "Intermediate" },
    { id: "3", name: "Advanced" },
    { id: "4", name: "Proficient" },

  ]);
  const [japaneseSkill, setJapaneseSkill] = useState([
    { id: "1", name: "N1" },
    { id: "2", name: "N2" },
    { id: "3", name: "N3" },
    { id: "4", name: "N4" },
    { id: "5", name: "N5" },
  ]); 

  const [fromDate, setFromDate] = useState(null); // for from date
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectJapan, setSelectJapan] = useState("");
  const [selectEng, setSelectEng] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [updateID, setUpdateID] = useState(localStorage.getItem(`Update`));
  const [loading, setLoading] = useState(false); // For Loading
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message
  const [confirmType, setConfirmType] = useState("");
  const [popUpShow, setPopUpShow] = useState(false); 
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [content, setContent] = useState("");

  useEffect(()=> {
    let flag = localStorage.getItem(`LoginProcess`)
    let updateFrom = localStorage.getItem(`Update`)
    localStorage.removeItem('Update')
    setUpdateID(updateFrom);
    if (flag == "true") {
    
       if(updateFrom != null){
          formload();
          setUpdateStatus(true);
          
       }
    } else {
      history.push(`/Login`);
    }
  },[])


  const userNameChange = (e) => {
    setUserName(e.target.value);
  }

  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  const selectJapanChange = (e) => {
    setSelectJapan(e.target.value);
  }

  const selectEngChange = (e) => {
    setSelectEng(e.target.value);
  }

  const selectGenderChange = (e) => {
    setSelectGender(e.target.value);
  }

  const fromDateChange = (e) => {
    let date = "";
    date = moment(e).format("YYYY-MM-DD");
    setFromDate(date);
  }
  
   const formload = async() => {

    setLoading(true);
    setUpdateStatus(false);
    let saveData = {
      method: "get",
      url: `employee/edit/${updateID}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUserName(response.data.data.name);
        setEmail(response.data.data.email);
        setSelectJapan(response.data.data.japanese_skill)
        setSelectEng(response.data.data.english_skill)
        setFromDate(response.data.data.date_of_birth)
        setSelectGender(response.data.data.gender)
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
   }

   const reset =() => {
    setUserName("");
    setEmail("");
    setSelectJapan("");
    setSelectEng("");
    setFromDate(null);
    setSelectGender("");
   }

  const updateClick = async() => {
    setUpdateID("");
    setLoading(true);
    setUpdateStatus(false);
    let saveData = {
    
      method: "post",
      url: `employee/update/${updateID}`,
      params: {
       name : userName,
          email : email,
          japanese_skill : selectJapan,
          english_skill : selectEng,
          gender : selectGender,
          email: email,
          date_of_birth:fromDate,
         

      },
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([response.data.message]);
       
        setError([]);
        reset();
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
 }

  const saveClick = () => {
    
    if(!nullChk(userName)){
      setError(["Please Fill Username"]);
    }else if (!validateName(userName)) {
      setError(["Please fill Character Only in Username"]);
    }else if(!nullChk(email)) {
      setError(["Please fill Email"]);
    }else if (!emailChk(email)) {
      setError(["Please fill Email Format"]);
    }else if(selectGender === ""){
      setError(["Please Select Gender"]);
    }else if(!nullChk(fromDate)){
      setError(["Please Select Birthday"]);
    }else if(selectEng === ""){
      setError(["Please Select EnglishSkill"]);
    }else if(selectJapan === ""){
      setError(["Please Select JapaneseSkill"]);
    }else{
     setConfirmationModal(true);
     setContent("Are you sure want to save");
     setConfirmType("save");
    
  }
}

  const saveOK = async() => {
     setLoading(true);
     setUpdateStatus(false);
    
      let saveData = {
       
       method: "post",
       url: `employee/save`,
       params: {
        name : userName,                //send data to backend
           email : email,
           japanese_skill : selectJapan,
           english_skill : selectEng,
           gender : selectGender, 
           date_of_birth:fromDate,
       },
     };
     let response = await ApiRequest(saveData);  
     if (response.flag === false) {
      
       setError(response.message);
       setSuccess([]);
       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
     } else {
       if (response.data.status == "OK") {
          
         window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          
         setSuccess([response.data.message]);
         reset();
         setError([]);
       } else {
         setError([response.data.message]);
         setSuccess([]);
         window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
       }
       
     }
     
     setLoading(false);
     setConfirmationModal(false);
    }
    
    
    
        
  
    
  

  return (
    <>
      <CRow>
      
        <CCol xs="12">
        <SuccessError success={success} error={error} />
          <CCard>
            
            <CCardHeader>
            
              <h4 className='m-0'>Employee Registeration</h4>
            </CCardHeader>
            <CCardBody>
        
              <CRow style={{ marginTop: "10px" }}>
                
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>UserName <span style={{color:"red"}}>*</span></p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={userName} onChange={userNameChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Gender <span style={{color:"red"}}>*</span></p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectGender}
                        onChange={selectGenderChange}
                      >
                        <option value="">-- Select --</option>
                        {genderData.map((data, index) => {
                          return (
                            <option
                              key={index}
                              value={data.name}
                            >
                              {data.name}
                            </option>
                          )
                        }
                        )}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>

                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>English Skill <span style={{color:"red"}}>*</span></p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectEng}
                        onChange={selectEngChange}
                      >
                        <option value="">-- Select --</option>
                        {englishSkillData.map((data, index) => {
                          return (
                            <option
                              key={index}
                              value={data.name}
                            >
                              {data.name}
                            </option>
                          )
                        }
                        )}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>
                
                </CCol>


                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Email <span style={{color:"red"}}>*</span></p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={email} onChange={emailChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Date of Birth <span style={{color:"red"}}>*</span></p>
                    </CCol>
                    <CCol lg="7">
                      <DatePicker value={fromDate} change={fromDateChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>
                  <CRow style={{ marginTop: "1px" }}>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Japanese Skill <span style={{color:"red"}}>*</span></p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectJapan}
                        onChange={selectJapanChange}
                      >
                        <option value="">-- Select --</option>
                        {japaneseSkill.map((data, index) => {
                          return (
                            <option
                              key={index}
                              value={data.name}
                            >
                              {data.name}
                            </option>
                          )
                        }
                        )}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br></br>

                  
                </CCol>

              </CRow>
              <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
                { updateStatus == false && (
                    <CButton className="form-btn" onClick={saveClick}>
                      Save
                    </CButton>
                  )}
                {
                  updateStatus == true && (
                    <CButton className="form-btn" onClick={updateClick}>
                      Update
                    </CButton>
                  )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ResultClickModel 
            popUpShow={popUpShow} 
            closeBtn={() => setPopUpShow(false)} 
            userName = {userName}
            />

              <Confirmation
                show={confirmationModal}
                content={content}
                type={confirmType}
                saveOK={saveOK}
                // confirmOK={confirmOK}
                // deleteOK={deleteOK}
                cancel={() => setConfirmationModal(false)}
                cancelButton="Cancel"
                okButton="Yes"
              />
      <Loading start={loading} />

    </>
  )
}

export default EmployeeRegistrationIndex