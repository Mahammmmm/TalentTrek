import React, { useState,useEffect }from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import "./ResumeForm_Final.css"
import html2pdf from 'html2pdf.js';




const Questionnaire = () => {


  const location = useLocation();
  const navigate = useNavigate();
  // Access the data from the location state
  const personalDetailsData = location.state.personalDetailsData;
  const [workExperienceData, setWorkExperienceData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [SkillsData, setSkillsData] = useState([]);
  const [SummaryData, setSummaryData] = useState({});
  


  //handle back
  const handleBack = (e) => {
    e.preventDefault();
    navigate('/ResumeFormS', { state: personalDetailsData });
    //window.location.href = "./ResumeFormS"
  };



  //handle next
  const handleNext = (e) => {
    e.preventDefault();
    window.location.href = "./resumetemplates"
  };



  //handle download
  const handleDownload = () => {
   
    const workExperienceHTML = workExperienceData.map((experience, index) => {
      const startDate = new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric' });
      const endDate = experience.endDate ? new Date(experience.endDate).toLocaleDateString('en-US', { year: 'numeric' }) : 'Present';
    
      return (
        `<div class="experience" key=${index}>
          <div class="date">${startDate} - ${endDate}</div>
          <div class="employer" style="font-weight: bold;">${experience.employer}</div>
          <div class="job-title">${experience.jobTitle}</div>
          <div class="location">${experience.location}</div>
          <div class="job-description">${experience.jobDescription}</div>
        </div>`
      );
    }).join('');
  
    const educationHTML = educationData.map((education, index) => {
      const graduationDate = new Date(education.graduationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
      return (
        `<div class="education" key=${index}>
          <div class="date">${graduationDate}</div>
          <div class="study-name" style="font-weight: bold;">${education.fieldOfStudy} - ${education.degree}</div>
          <div class="school-name">${education.schoolName}</div>
          <div class="school-location">${education.schoolLocation}</div>
        </div>`
      );
    }).join('');
  
    const skillsHTML = `<div class="skills">
      <ul>${SkillsData.map((skill, index) => `<li key=${index}>${skill}</li>`).join('')}</ul>
    </div>`;
  
    const contactHTML = `<div class="contact">
      <div class="contact-item">${personalDetailsData.city}, ${personalDetailsData.country}</div>
      <div class="contact-item">${personalDetailsData.phoneNumber}</div>
      <div class="contact-item">${personalDetailsData.email}</div>
    </div>`;

    const template = `
      <html>
        <head>
          <title>Resume Template</title>
          <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            width: 90%;
            padding: 0;
            background-color: #fff;
          }

          .resume-top {
            background-color: #ffffff;
            padding: 30px;
            display: flex;
            justify-content: space-between;
          }

          .name {
            font-size: 45px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .profession {
            font-size: 18px;
            color: black;
            position: relative;
          }
          .profession::after {
          content: "";
          display: block;
          width: 60%; /* You can adjust the width here */
          height: 5px;
          background-color: #000000;
          position: absolute;
          bottom: -29px; /* Adjust this value to control the distance between the line and the text */
          }

          .professional-summary {
            width: 70%;
            font-size: 14px;
            text-align: justify;
          }

          .resume-bottom {
              margin-top: 20px;
            background:#A9D4DB;
            padding: 60px;
            display: flex;
          }

          .section1 {
              flex: 2;
            width: 100%;
            margin-bottom: 20px;
          }
          .section2 {
              flex: 1;
            width: 100%;
            margin-bottom: 20px;
          }

          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            position: relative;
          }
          .section-title::after {
          content: "";
          display: block;
          width: 80%; /* You can adjust the width here */
          height: 3px;
          background-color: #000000;
          position: absolute;
          bottom: -12px; /* Adjust this value to control the distance between the line and the text */
          }
          .section-title2 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            position: relative;
          }
          .section-title2::after {
          content: "";
          display: block;
          width: 117%; /* You can adjust the width here */
          height: 3px;
          background-color: #000000;
          position: absolute;
          bottom: -12px; /* Adjust this value to control the distance between the line and the text */
          }
          .experience, .education, .skills, .contact {
            margin-top: 20px;
          }

          .contact-item {
            margin-bottom: 5px;
          }
          .left{
              flex: 3;
              
          }
          .professional-summary{
              flex: 1;
              width: 50%;
          }
        </style>
      </head>
  <body>

    <!-- Top Section -->
    <div class="resume-top">
      <div class="left">
        <div class="name">${personalDetailsData.fullName}</div>
        <div class="profession">${personalDetailsData.profession}</div>
      </div>
      <div class="professional-summary">
        <p>${SummaryData.professionalSummary}</p>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="resume-bottom">
      
      <div class="section1">
        <div class="section-title">Experience</div >
        ${workExperienceHTML}
      </div>

      <div class="section2">
        <div class="section-title2">Education</div>
        ${educationHTML}
        <div class="section-title2">Skills</div>
        ${skillsHTML}
        <div class="section-title2">Contact</div>
        ${contactHTML}
      </div>
    </div>
  </body>
</html>

    `;

    // Convert HTML to PDF using html2pdf
    html2pdf().from(template).save('resume.pdf');

    
  };



  const fetchResumeData = async () => {
    try {
      const response = await fetch(`http://localhost:3002/getResume?email=${personalDetailsData.email}`);
      const data = await response.json();

      if (data.status === 'ok') {
        setWorkExperienceData(data.data.workExperienceData);
        setEducationData(data.data.educationData);
        setSkillsData(data.data.SkillsData);
        setSummaryData(data.data.SummaryData);
      } else {
        console.error('Error fetching resume data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching resume data:', error);
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, []);


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
            <li>&#10003;</li>
            <li>&#10003;</li>
            <li >&#10003;</li>
            <li className="active">6</li>
          </ul>
          <div className="status-text">
            <p >Personal Details</p>
            <p >Work Experience</p>
            <p>Education</p>
            <p>Skills</p>
            <p >Summary</p>
            <p style={{fontWeight:'bold'}}>Final</p>
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
          <h2>Download Resume</h2>
          <p>Your resume is ready you can download it.</p>
        </div>
        
          
            
        
        

        <form className="personal-details-form_WE" >

        <button type="button" className='downloadBtn' onClick={handleDownload}>Download</button>
          

        
            <div className="button_Final">
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit" onClick={handleNext}>Finish</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Questionnaire