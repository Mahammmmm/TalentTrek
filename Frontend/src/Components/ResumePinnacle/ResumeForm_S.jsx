import React, { useState,useEffect }from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import "./ResumeForm_S.css"
import axios from 'axios';



const Questionnaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the data from the location state
  const personalDetailsData = location.state.personalDetailsData;
  const workExperienceData = location.state.workExperienceData;
  const educationData = location.state.educationData;
  const SkillsData = location.state.data;


    const [summary, setSummary] = useState('');





    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        // Prepare the data to be sent to the API
        const data = {
          email: personalDetailsData.email,
          professionalSummary: summary,
        };
    
        // Make a POST request to the new API endpoint for professional summary
        const response = await axios.post('http://localhost:3002/professional-summary', data);
    
        if (response.data.status === 'ok') {
         // alert('Professional summary submitted successfully!');
          navigate('/ResumeFormF_pinnacle', { state: {personalDetailsData,workExperienceData,educationData,SkillsData,data} });
        //window.location.href = "./ResumeFormF"
        } else {
          alert('Error submitting professional summary. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting professional summary:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    };
    


  const handleBack = (e) => {
    e.preventDefault();
    navigate('/ResumeFormSkills_pinnacle', { state: personalDetailsData });
      
    //window.location.href = "./ResumeFormSkills"
  };

 


  return (
    <div className="two-section-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="left-header">
          <h1>TalentTrek</h1>
        </div>
        <div className="status-bar">
          <ul>
            <li >&#10003; </li>
            <li >&#10003;</li>
            <li>&#10003;</li>
            <li>&#10003;</li>
            <li className="active">5</li>
            <li>6</li>
          </ul>
          <div className="status-text">
            <p >Personal Details</p>
            <p >Work Experience</p>
            <p>Education</p>
            <p>Skills</p>
            <p style={{fontWeight:'bold'}}>Summary</p>
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
          <h2>Summary</h2>
          <p>Your summary shows employers you’re right for their job.</p>
          <p style={{color:'red',fontSize:'15px'}}>Note: Information cannot be updated later.</p>
        </div>
        <form className="personal-details-form_S" onSubmit={handleSubmit}>


            <label htmlFor="summary">Professional Summary:</label>
            <input className='skillinput' type="text" id="summary" name="summary" required placeholder='Write your summary here....' value={summary} onChange={(e) => setSummary(e.target.value)}/>

          
            <div className="button_S">
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit" >Next</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Questionnaire