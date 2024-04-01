import React, { useState,useEffect }from 'react';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import "./ResumeForm_WE.css"
import axios from 'axios'; // Import axios for making HTTP requests



const WorkExperience = () => {
  const location2 = useLocation();
  const navigate = useNavigate();
  
  // Access the data from the location state
  const personalDetailsData = location2.state;


  
  const [jobTitle, setJobTitle] = useState('');
  const [employer, setEmployer] = useState('');
  const [location, setLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [month1, setMonth1] = useState('');
  const [year1, setYear1] = useState('');
  const [month2, setMonth2] = useState('');
  const [year2, setYear2] = useState('');
  const [disableSecondSet, setDisableSecondSet] = useState(false);

  const handleCheckboxChange = () => {
    setDisableSecondSet(!disableSecondSet);
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (jobTitle !== '' && employer !== '' && location !== '' && jobDescription !== '') {
      try {
        // Prepare the data to be sent to the API
        const data = {
          email: personalDetailsData.email,
          jobTitle,
          employer,
          location,
          jobDescription,
          startDate: `${year1}-${month1}`, 
          endDate: disableSecondSet ? null : `${year2}-${month2}`,
          currentJob: disableSecondSet,
        };

        // Make a POST request to your API endpoint
        const response = await axios.post('http://localhost:3002/work-experience', data);

        if (response.data.status === 'ok') {
          //alert('Form submitted successfully!');
          navigate("/ResumeFormWorkExp2",{state: {personalDetailsData,data}})  
          
          //window.location.href = './ResumeFormWorkExp2';
        } else {
          alert('Error submitting form. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An unexpected error occurred. Please try again.',error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };


  const handleBack = (e) => {
    e.preventDefault();
    navigate("/resumeform",{state: personalDetailsData})  
          
    //window.location.href = "./resumeform"
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
            <li className="active">2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
          <div className="status-text">
            <p >Personal Details</p>
            <p style={{fontWeight:'bold'}}>Work Experience</p>
            <p>Education</p>
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
          <h2>Work Experience</h2>
          <p>You can include any work experience, internships, scholarships,
relevant coursework and academic achievements.</p>
<p style={{color:'red',fontSize:'15px'}}>Note: Information cannot be updated later.</p>
        </div>
        <form className="personal-details-form_WE" onSubmit={handleSubmit}>


            <label htmlFor="fullName">Job Title:</label>
            <input type="text" id="JobTitle" name="JobTitle" required placeholder='e.g Retail Sales Associate' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>

            <label htmlFor="fullName">Employer:</label>
            <input type="text" id="Employer" name="Employer" required placeholder='e.g Alkaram Studio' value={employer} onChange={(e) => setEmployer(e.target.value)}/>

            <label htmlFor="fullName">Location:</label>
            <input type="text" id="Location" name="Location" required placeholder='e.g Karachi,Sindh,Pakistan'value={location} onChange={(e) => setLocation(e.target.value)}/>

            <label htmlFor="fullName">Job Description:</label>
            <input type="text" id="JobDescription" name="JobDescription" required placeholder='e.g Type your achievements and responsibilities here'value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>

            <div className='MY1'>
                <label htmlFor="month1">Start Date:</label>
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
            
            <div className='MY1'>
                <label htmlFor="month1">End Date:</label>
                <div>
                    <select
                    id="month2"
                    value={month2}
                    onChange={(e) => setMonth2(e.target.value)}
                    disabled={disableSecondSet}
                    >
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
                    <select
                    id="year2"
                    value={year2}
                    onChange={(e) => setYear2(e.target.value)}
                    disabled={disableSecondSet}
                    >
                    <option value="">Year</option>
                    {Array.from({ length: 2024 - 1959 + 1 }, (_, index) => 1959 + index).map((year) => (
                    <option key={year} value={year}>
                    {year}
                    </option>))}
                    </select>
                </div>

                
            </div>
            <div className='chckbox'>
            <label htmlFor="disableSecondSet">I currently work here</label>
                <input
                type="checkbox"
                id="disableSecondSet"
                checked={disableSecondSet}
                onChange={handleCheckboxChange}
                />
                
            </div>
            
            
          
            <div className="button_WE">
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit">Next</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default WorkExperience