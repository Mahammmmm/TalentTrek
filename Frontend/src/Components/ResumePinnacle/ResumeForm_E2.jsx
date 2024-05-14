import React, { useState }from 'react';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import "./ResumeForm_E2.css"



const Questionnaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the data from the location state
  const personalDetailsData = location.state.personalDetailsData;
  const workExperienceData = location.state.workExperienceData;
  const educationData = location.state.educationData;

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/ResumeFormEdu_pinnacle",{state: personalDetailsData})  
        
        //window.location.href = "./ResumeFormEdu"
    };
    const handleNext = (e) => {
        e.preventDefault();
        navigate("/ResumeFormSkills_pinnacle",{state: {personalDetailsData,workExperienceData,educationData}})  
        
       // window.location.href = "./ResumeFormSkills"
    };
    const handleAdd = (e) => {
        e.preventDefault();
        navigate("/ResumeFormEdu_pinnacle",{state: {personalDetailsData,workExperienceData,educationData}})  
        
        //window.location.href = "./ResumeFormEdu"
    };

  return (
    <div className="two-section-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="left-header">
        <a href='/' className='logo'>
            Talent<span className='brown'>Trek</span>
          </a>
        </div>
        <div className="status-bar">
          <ul>
            <li >&#10003; </li>
            <li >&#10003;</li>
            <li className="active">3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
          <div className="status-text">
            <p >Personal Details</p>
            <p >Work Experience</p>
            <p style={{fontWeight:'bold'}}>Education</p>
            <p>Skills</p>
            <p>Summary</p>
            <p>Final</p>
          </div>
        </div>
        <div className="resufooter">
          <p>&copy; 2023 TalentTrek</p>
          <p>talenttrek58@gmail.com</p>
        </div>
      </div>




      {/* Right Section - Personal Details */}
      <div className="right-section">
        <div className="right-header">
          <h2>Education</h2>
          <p>You can include more!</p>

        </div>

            <div className='addMCont'>
                <h4>Would you like to add more?</h4>
                <button type="button" className='addMBtn' onClick={handleAdd}>Add</button>
            </div>
            <div className="button_WE2">
                <button type="button" onClick={handleBack}> Back</button>
                <button type="submit" onClick={handleNext}>Next</button>
            </div>
        
      </div>
    </div>
  )
}

export default Questionnaire