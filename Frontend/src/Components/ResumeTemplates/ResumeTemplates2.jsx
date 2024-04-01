import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import "./ResumeTemplates.css"
import Footer from "../Footer/Footer";
import {user,Brussels_Template,Athens_Template,UserIcon,resume_style,resume_SummitStyle,resume_PrimePersona,resume_Pinnacle,resume_Impactful} from "../../assets/index-assets"
const Questionnaire = () => {

    const [userData, setUserData] = useState("");

    useEffect(() => {
      fetch("http://localhost:3002/userData",{
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
          token:window.localStorage.getItem("token"),
        }),
      })
      .then((res)=>res.json())
      .then((data=>{
        console.log(data,"userData");
        setUserData(data.data);
      }));
    },[]);
  const handleTemplates1 = (e) => {
    e.preventDefault();
    window.location.href = "./ResumeForm_SummitStyle"
  };


  const handleTemplates2 = (e) => {
    e.preventDefault();
    window.location.href = "./resumeform"
  };

  const handleTemplates3 = (e) => {
    e.preventDefault();
    window.location.href = "./ResumeForm_pinnacle"
  };

  const handleTemplates4 = (e) => {
    e.preventDefault();
    window.location.href = "./ResumeForm_Impactful"
  };

  return (
    <div>
        <nav className='navbar2'>
            <div>
                <a href='#' className='logo2'>
                    Talent<span className='brown2'>Trek</span>
                </a>
            </div>
            <div>
                <div class="image-and-text-container2">
                    <p className='welcome_uni'>{userData.name}{' '} </p>
                    {userData.image ? (
                    <Link to="/userprofile"><img src={userData.image} alt='UserImage' className='UserImage_uni'></img></Link>
                    ) : (
                    <Link to="/userprofile"><img src={user} alt='UserIcon' className='UserImage_uni'></img></Link>
                    )}
                </div>
            </div> 
        </nav>




        <section id='main' className='resumesect'>

        </section>



        <section id='main' className='resumesect2'>
          <div className='rescont'>
            <div className='resls'>
              <img src={resume_style} alt="Rectangle48"  className='res_bg3'/>
            </div>
            <div className='resrs'>
              <div className='resdet'>
                  <h1 className='res_quote1'><span style={{color:'black'}}>Your Story</span> <br /> Your Success</h1>
                  <br />
                  <p className='res_p'>Transform your career aspirations into a compelling document with our user-friendly interface, tailored to showcase your unique skills and accomplishments, ensuring you stand out in the competitive job market!</p>
              </div>
            </div>
          </div>
        </section>





        <section id='main' className='resumesect3'>
          <div className="resume-section">

            <h2 className="section-heading">Resume Templates</h2>


            <div className="template-container">
              <div className="template">
                <div className="template-image">
                  <img src={resume_SummitStyle} alt="Template 1" />
                </div>
                <div className="template-details">
                  <h3>Summit Style</h3>
                  <button className='tembtn' onClick={handleTemplates1}>Use This Template</button>
                </div>
              </div>

              <div className="template">
                <div className="template-image">
                  <img src={resume_PrimePersona} alt="Template 2" />
                </div>
                <div className="template-details">
                  <h3>Prime Persona</h3>
                  <button className='tembtn' onClick={handleTemplates2}>Use This Template</button>
                </div>
              </div>
            </div>




            <div className="template-container">
              <div className="template">
                <div className="template-image">
                  <img src={resume_Pinnacle} alt="Template 3" />
                </div>
                <div className="template-details">
                  <h3> Pinnacle</h3>
                  <button className='tembtn' onClick={handleTemplates3}>Use This Template</button>
                </div>
              </div>

              <div className="template">
                <div className="template-image">
                  <img src={resume_Impactful} alt="Template 4" />
                </div>
                <div className="template-details">
                  <h3>Impactful </h3>
                  <button className='tembtn' onClick={handleTemplates4}>Use This Template</button>
                </div>
              </div>
            </div>
          </div>

        </section>
        
        
        <Footer/> 
    </div>   
  )
}

export default Questionnaire