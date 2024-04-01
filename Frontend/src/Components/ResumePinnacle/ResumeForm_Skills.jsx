import React, { useState,useEffect }from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import "./ResumeForm_Skills.css"
import axios from 'axios';


const Questionnaire = () => {

  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the data from the location state
  const personalDetailsData = location.state.personalDetailsData;
  const workExperienceData = location.state.workExperienceData;
  const educationData = location.state.educationData;


    const [skills, setSkills] = useState([
        {
          name: '',
        },
      ]);
  const [disableSecondSet, setDisableSecondSet] = useState(false);



  const handleCheckboxChange = () => {
    setDisableSecondSet(!disableSecondSet);
    // If disabling the second set, clear the existing skills
    setSkills([{ name: '' }]);
  };



  const handleSkillsChange = (index, e) => {
    const updatedSkills = [...skills];
    updatedSkills[index][e.target.name] = e.target.value;
    setSkills(updatedSkills);
  };



  const handleAddMore = (type) => {
    if (type === 'skills') {
      setSkills([...skills, { name: ''}]);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to be sent to the API
      const data = {
        email: personalDetailsData.email,
        skills: disableSecondSet ? null : skills.map((skill) => skill.name),
      };

      // Make a POST request to your API endpoint for skills
      const response = await axios.post('http://localhost:3002/skills', data);

      if (response.data.status === 'ok') {
        //alert('Skills submitted successfully!');
        navigate('/ResumeFormS_pinnacle', { state: {personalDetailsData,workExperienceData,educationData,data} });
      } else {
        alert('Error submitting skills. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting skills:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };



  const handleBack = (e) => {
    e.preventDefault();
    navigate('/ResumeFormEdu2_pinnacle', { state: personalDetailsData });
      
    //window.location.href = "./ResumeFormEdu2"
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
            <li className="active">4</li>
            <li>5</li>
            <li>6</li>
          </ul>
          <div className="status-text">
            <p >Personal Details</p>
            <p s>Work Experience</p>
            <p>Education</p>
            <p style={{fontWeight:'bold'}}>Skills</p>
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
          <h2>Your Skills</h2>
          <p>You can include any of your skills!</p>
          <p style={{color:'red',fontSize:'15px'}}>Note: Information cannot be updated later.</p>
        </div>

        <form className="personal-details-form_Skills" onSubmit={handleSubmit}>


            
            <div className='S_chckbox'>
            <label htmlFor="disableSecondSet">No Skills</label>
              
            <input
                type="checkbox"
                id="disableSecondSet"
                checked={disableSecondSet}
                onChange={handleCheckboxChange}
                />
              
                
            </div>
<br /><br />
            {skills.map((skill, index) => (
                        <div key={index}>
                          <br />
                            <label>Skill Name:</label>
                            <br />
                            <input type="text" 
                                name="name" 
                                disabled={disableSecondSet}
                                value={skill.name} 
                                onChange={(e) => handleSkillsChange(index, e)} required />    
                        </div>
                        ))}
                        <br /><br /><br />
                        <button type="button" onClick={() => handleAddMore('skills')} className='plus'>
                        +
                        </button>


            
            
            
            
            
          
            <div className="button_Skills">
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit">Next</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Questionnaire