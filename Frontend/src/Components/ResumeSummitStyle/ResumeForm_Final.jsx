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
    navigate('/ResumeFormS_SummitStyle', { state: personalDetailsData });
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
          <div class="date">${experience.jobTitle} . ${startDate} - ${endDate}</div>
          <br/>
          <div class="employer" style="font-weight: bold;">${experience.employer} . ${experience.location}</div>
          <br/>
          <div class="job-description">${experience.jobDescription}</div>
          <br/><br/>
        </div>`
      );
    }).join('');
    
  
    const educationHTML = educationData.map((education, index) => {
      const graduationDate = new Date(education.graduationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
      return (
        `<div class="education" key=${index}>
          <div class="study-name" >${education.fieldOfStudy} , ${education.degree} . ${graduationDate}</div>
          <div class="school-name" style="font-weight: bold;">${education.schoolName}</div>
          <div class="school-location">${education.schoolLocation}</div>
          <br/>
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
      <br/>
      </div>`;

  
    const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Resume Template</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          
        }
    
        .resume-cont{
          display: flex;
          background-color:#fff;
        }
    
        .left-section_temp {
          flex: 1;
          padding-left: 50px;
          padding-top: 20px;

        }
    
        .right-section {
          flex: 2;
          padding-top: 20px;
          padding-right: 50px;
          border-left: 2px solid #D4B49A;
        }
    
        .line {
          border-top: 2px solid #D4B49A;
          margin: 20px 0;
        }
    
    
        .contact-info, .education-info, .skills {
          margin-bottom: 20px;
        }
    
        
        .top-section_temp{
            background-color: #E5D3C3;
            padding: 20px;
            
        }
      .top-section_temp p{
        font-size: 15px;
        margin-left: 30px; 
        text-transform: uppercase;
        
    }
        li{
            list-style-type: none;
            left: -10;
        }
        .name {
          margin-bottom: 10px;
          font-size: 55px;
          text-transform: uppercase;
          margin-left: 30px; 
          color: #474747;
          font-family: 'Gurajada', serif, sans-serif;


        }
      </style>
    </head>
    <body>
    
      <!-- Top Section -->
      <div class="top-section_temp">
        <h1 class="name" >${personalDetailsData.fullName}</h1>
        <p>${personalDetailsData.profession}</p>
      </div>
    
      <!-- Bottom Section -->
      <div class="resume-cont">
    
        <!-- Left Section -->
        <div class="left-section_temp">
    
          <!-- Contact Info -->
          <div class="contact-info">
            <div class="heading" style="font-weight: bold;">CONTACT</div>
            <br/>
            ${contactHTML}
          </div>
    
          <!-- Education Info -->
          <div class="education-info">
            <div class="heading" style="font-weight: bold;">EDUCATION</div>
            <br/>
            ${educationHTML}
          </div>
    
    
          <!-- Skills -->
          <div class="skills">
            <div class="heading" style="font-weight: bold;">SKILLS</div>
            <br/>
            ${skillsHTML}
          </div>
    
        </div>
    
        <!-- Right Section -->
        <div class="right-section">
    
    
          <!-- Top Section in Right -->
          <div class="profile-section">
            <div class="heading" style="font-weight: bold;">PROFILE</div>
            <br/>
            <p>${SummaryData.professionalSummary}</p>
          </div>
    
          <div class="line"></div>
    
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
          <h1>TalentTrek</h1>
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