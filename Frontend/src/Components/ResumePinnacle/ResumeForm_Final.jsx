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
    navigate('/ResumeFormS_pinnacle', { state: personalDetailsData });
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
            <p style="font-weight: bold;">${experience.jobTitle} | ${experience.employer} | ${experience.location}</p>
            <p>${startDate} - ${endDate}</p>
            <p>${experience.jobDescription}</p>
          
        </div>`
      );
    }).join('');
    
  
    const educationHTML = educationData.map((education, index) => {
      const graduationDate = new Date(education.graduationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
      return (
        `<div class="education" key=${index}>
            <p style="font-weight: bold;">${education.fieldOfStudy} - ${education.degree} | ${education.schoolName}</p>
            <p>${graduationDate}</p>
          
        </div>`
      );
    }).join('');
  
    const skillsHTML = 
      `<div class="skills">
          <ul class="resume-list">${SkillsData.map((skill, index) => `<li class="resume-list-item" key=${index}>${skill}</li>`).join('')}</ul>
        
      </div>`;
  
    const template = `
    <html>
    <head>
      <title>Resume Template</title>
      <style>
      
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: Arial, sans-serif;
      }

      .background {
        background-color: rgb(244, 250, 247); /* Set your desired background color */
        height: 100%;
      }

        .bg{
          padding: 70px;
          
        
        }
        .name h1{
            font-size: 40px;
            text-transform: uppercase;
            color: #215A3C;
            font-family: Arial, sans-serif;
        }
        .contact-info p {
          font-size: 13px;
          margin-bottom: 10px;
          color: #215A3C;
          font-family: Arial, sans-serif;
        }
    
        .resume-line {
          border-top: 4px solid #61C092;
          margin: 20px 0;
        }
    
        .resume-list {
          padding: 0;
        }
    
        .resume-list-item {
          margin-bottom: 5px;
          font-size: 13px;
          color: #215A3C;
        }
        .Heading h5{
            font-weight: bolder;
            color: #215A3C;
            font-family: Arial, sans-serif;
        }
        .Heading p{
            font-size: 13px;
          margin-bottom: 10px;
          color: #215A3C;
          font-family: Arial, sans-serif;
        }
      </style>
    </head>
    <body>
    <div class="background">
      <div class="bg">
    
      <!-- Full Name -->
      <div class="name"><h1 style="font-weight: bold;">${personalDetailsData.fullName}</h1></div>
    
      <!-- Contact Info -->
      <div class="contact-info">
        <p style="font-weight: bold;">${personalDetailsData.city}, ${personalDetailsData.country} | ${personalDetailsData.phoneNumber} | ${personalDetailsData.email}</p>
        <p>${SummaryData.professionalSummary}</p>
    
      </div>
    
      <!-- Line -->
      <div class="resume-line"></div>
    
      <!-- Education -->
      <div class="Heading">
      <h5>EDUCATION</h5>
      ${educationHTML}
      </div>
      

      <!-- Line -->
      <div class="resume-line"></div>
    
      <!-- Experience -->
      <div class="Heading">
      <h5>EXPERIENCE</h5>
      ${workExperienceHTML}
      </div>
      


      <!-- Line -->
      <div class="resume-line"></div>
    
      <!-- Skills -->
      <div class="Heading">
          <h5>SKILLS</h5>
          ${skillsHTML}</div>
      
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