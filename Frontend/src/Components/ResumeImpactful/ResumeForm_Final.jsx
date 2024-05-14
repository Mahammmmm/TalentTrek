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
    navigate('/ResumeFormS_Impactful', { state: personalDetailsData });
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
        <div class="job-title">${experience.jobTitle}</div>
          <div class="date" style="font-weight: bold;">${startDate} - ${endDate}</div>
          <div class="job-description">${experience.jobDescription}</div>
          <br/>
          </div>`
      );
    }).join('');
  
    const educationHTML = educationData.map((education, index) => {
      const graduationDate = new Date(education.graduationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
      return (
        `<div class="education" key=${index}>
        <div class="school-name">${education.schoolName}</div>
          <div class="date" style="font-weight: bold;">${graduationDate}</div>
          <div class="study-name" >${education.fieldOfStudy} - ${education.degree}</div>
          <br/>
        </div>`
      );
    }).join('');
  
    const skillsHTML = `<div class="skills">
      <ul>${SkillsData.map((skill, index) => `<li key=${index}>${skill}</li>`).join('')}</ul>
    </div>`;
  
    const contactHTML = `<div class="contact">
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
          padding: 0;
          background-color:#fff;
        }
    
        .name_cont{
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 10px;
            padding-top:100px;
        }
        .profession_cont{
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 10px;
        }
        .line_div {
        border-bottom: 1px solid black;
        margin-left: 100px; 
        margin-right: 100px; 
      }
      .resume-container {
          display: flex;
        }
      .left-section_temp {
          flex: 1;
          padding-left: 100px;
          margin-top: 20px;
        }
    
        .right-section {
          flex: 2;
          padding-right: 100px;
        }
        .heading {
            color: #3f3f3fe2;
          font-size: 18px;
          font-weight: bold;
          font-family: 'Gurajada',serif;
          position: relative;
        }
        .heading::after {
              content: "";
              display: block;
              width: 20%; /* You can adjust the width here */
              height: 1.3px;
              background-color: #000000;
              position: absolute;
              bottom: -5px; /* Adjust this value to control the distance between the line and the text */
              }
        .contact-info, .education-info, .skills, .profile-section{
          margin-bottom: 50px;
        }
        li{
            list-style-type: none;
            margin-left: -30px;
        }
      </style>
    </head>
    <body>
    
      <!-- Top Section -->
      <div class="name_cont">
        <h1 style="font-size: 45px;  margin-bottom: 10px; font-family: 'Gurajada',serif; 
        color: #3f3f3fe2;margin-left: 30px;">${personalDetailsData.fullName}</h1>
        
      </div>
    
      <div class="line_div"></div>
    
    
      <div class="profession_cont">
        <p style="font-size: 18px;margin-left: 30px; color: #3f3f3fe2;">${personalDetailsData.profession}</p>
      </div>
    
      <div class="line_div"></div>
    
      <!-- Bottom Section -->
      <div class="resume-container">
    
        <!-- Left Section -->
        <div class="left-section_temp">
    
          <!-- Contact Info -->
          <div class="contact-info">
            <div class="heading" style="font-weight: bold;">CONTACT</div>
            <br/>
            ${contactHTML}
          </div>

          <!-- Skills -->
          <div class="skills">
            <div class="heading" style="font-weight: bold;">SKILLS</div>
            <br/>
            ${skillsHTML}
          </div>

          <!-- Education Info -->
          <div class="education-info">
            <div class="heading" style="font-weight: bold;">EDUCATION</div>
            <br/>
            ${educationHTML}
          </div>
    
        </div>
    
          
    
    
          
    
        <div className="user-divider"></div>
        <!-- Right Section -->
        <div class="right-section">
    
    
          <!-- Top Section in Right -->
          <div class="profile-section">
            <div class="heading" style="font-weight: bold;">PROFILE</div>
            <br/>
            <p>${SummaryData.professionalSummary}</p>
          </div>
    
          <!-- Bottom Section in Right -->
          <div class="experience-info">
            <div class="heading" style="font-weight: bold;">EXPERIENCE</div>
            <br/>
            ${workExperienceHTML}
          </div>
    
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