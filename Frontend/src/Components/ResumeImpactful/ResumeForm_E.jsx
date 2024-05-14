import React, { useState,useEffect }from 'react';
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import "./ResumeForm_E.css"
import axios from 'axios'; // Import axios for making HTTP requests



const Questionnaire = () => {

  const navigate = useNavigate();
  const location2 = useLocation();
  
  // Access the data from the location state
  const personalDetailsData = location2.state.personalDetailsData;
  const workExperienceData = location2.state.workExperienceData;


    const [schoolName, setschoolName] = useState('');
  const [schoolLocation, setschoolLocation] = useState('');
  const [degree, setdegree] = useState('');
  const [fieldOfStudy, setfieldOfStudy] = useState('');
  const [month1, setMonth1] = useState('');
  const [year1, setYear1] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    if (schoolName !== '' && schoolLocation !== '' && degree !== '' && fieldOfStudy !== '') {
      try {
        // Prepare the data to be sent to the API
        const educationData = {
          email: personalDetailsData.email,
          schoolName,
          schoolLocation,
          degree,
          fieldOfStudy,
          graduationDate: `${year1}-${month1}`,
        };
  
        // Make a POST request to your API endpoint for education details
        const response = await axios.post('http://localhost:3002/education', educationData);
  
        if (response.data.status === 'ok') {
          //alert('Education details submitted successfully!');
          navigate("/ResumeFormEdu2_Impactful", { state: {personalDetailsData,workExperienceData,educationData} });
        } else {
          alert('Error submitting education details. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting education details:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };
  



  const handleBack = (e) => {
    e.preventDefault();
    navigate("/ResumeFormWorkExp2_Impactful",{state: personalDetailsData})  
          
    //window.location.href = "./ResumeFormWorkExp2"
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
          <p>Enter your education experience so far, even if you are a current student or did not graduate.</p>
          <p style={{color:'red',fontSize:'15px'}}>Note: Information cannot be updated later.</p>
        </div>
        <form className="personal-details-form_WE" onSubmit={handleSubmit}>


        <label htmlFor="fullName">School Name:</label>
          <input type="text" id="schoolName" name="schoolName" required placeholder='e.g Roots School' value={schoolName} onChange={(e) => setschoolName(e.target.value)}/>

          <label htmlFor="fullName">School Location:</label>
          <input type="text" id="schoolLocation" name="schoolLocation" required placeholder='e.g Islamabad,Punjab,Pakistan' value={schoolLocation} onChange={(e) => setschoolLocation(e.target.value)}/>

          <label htmlFor="fullName">Degree:</label>
          <select id="degree" value={degree} onChange={(e) => setdegree(e.target.value)}>
                        <option value="">Degree</option>
                        <option value="Matric">Matric</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="Phd">Phd</option>
                        <option value="Post Phd">Post Phd</option>
                    </select>
          
          <label htmlFor="fullName">Field Of Study:</label>
          <input type="text" id="fieldOfStudy" name="fieldOfStudy" required placeholder='e.g Computer Science' value={fieldOfStudy} onChange={(e) => setfieldOfStudy(e.target.value)}/>

            <div className='MY1'>
                <label htmlFor="month1">Graduation Date (Or Expected Graduation Date):</label>
                <div>
                    
                    <select id="month1" value={month1} onChange={(e) => setMonth1(e.target.value)}>
                        <option value="">Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>

                <div>
                    <select id="year1" value={year1} onChange={(e) => setYear1(e.target.value)}>
                    <option value="">Year</option>
                    {Array.from({ length: 2024 - 1959 + 1 }, (_, index) => 1959 + index).map((year) => (
                    <option key={year} value={year}>
                    {year}
                    </option>))}
                    </select>
                </div>
            </div>
            
            
            
            
          
            <div className="button_E">
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit">Next</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Questionnaire