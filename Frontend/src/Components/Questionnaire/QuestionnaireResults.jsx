import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./QuestionnaireResults.css"
import Footer from "../Footer/Footer";
import {user,peronality_predict_background,artistic,conventional,enterprising,investigative,realistic,social} from "../../assets/index-assets"

const Questionnaire = () => {

    const [userData, setUserData] = useState("");
    const [personalityNames, setPersonalityNames] = useState([]);

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



    useEffect(() => {
      if (userData.email) {
          fetchData();
      }
  }, [userData]);


    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: "POST",
          crossDomain: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: userData.email // Assuming email is used as identifier
        }),
        });
        //console.log(userData.email);
        const jsonData = await response.json();
    
        // Extract personality names from predictions object
        const { personality1, personality2 } = jsonData.predictions;
    
        // Set the personality names array
        setPersonalityNames([personality1, personality2]);
    
        console.log('Predictions:', personality1,personality2);
      } catch (error) {
        console.log('Error', error);
      }
    };
    
    
    const careers1 = () => {
      window.location.href = "./PredictedCareers";
    }
    const careers2 = () => {
      window.location.href = "./PredictedCareers2";
    }

    
    


  return (

    <div>
        <nav className='navbar2'>
            <div>
                <a href='#' className='logo2'>
                    Talent<span className='brown2'>Trek</span>
                </a>
            </div>
            <div>
          <div class="image-and-text-container">
          <p className='welcome_uni'>{userData.name}{' '} </p>
            {userData.image ? (
              <Link to="/userprofile"><img src={userData.image} alt='UserImage' className='UserImage_uni'></img></Link>
            ) : (
              <Link to="/userprofile"><img src={user} alt='UserIcon' className='UserImage_uni'></img></Link>
            )}
            {/**/}
          </div>
            </div>

        
      </nav>


      <section className='QsrRst_Sec1'>
          <div className='QsrRstImgContainer'>
              <img src={peronality_predict_background} alt="Image 2" className='QsrRstIMG'/>
              <div className='QsrRstTextOverlay'>
                  <p className="two-color-text">Embark on a journey of self-discovery as you delve into the depths of your personality</p>
              </div>
          </div>
      </section>

        

        <section className='QsrRst_ThirdContainer'> 
            <p className='QsrRst-Text2'>Your Results</p>
        </section>


        <section className="QsrRst_FourthContainer">
                <div className="QsrRst_leftSection">
                    <div className="QsrRst_topSection">
                        <h2 className="QsrRst__head1">Primary Personality</h2>
                    </div>
                    <div className="QsrRst_bottomSection">
                        <div className="QsrRst_bottomContent1">
                            <img src={getPersonalityImage(personalityNames[0])} alt={personalityNames[0]} className="personality_image" />
                            <h2 className="personality_name">{personalityNames[0]}</h2>
                            <p className="personality_description">{getPersonalityDescription(personalityNames[0])}</p>
                            <button className="personality_button1" onClick={careers1}>Check Careers That Suits Your Personality</button> 
                        </div>
                    </div>
                </div>
                <div className="QsrRst_rightSection">
                    <div className="QsrRst_topSection">
                        <h2 className="QsrRst__head2">Secondary Personality</h2>
                    </div>
                    <div className="QsrRst_bottomSection">
                        <div className="QsrRst_bottomContent2">
                            <img src={getPersonalityImage(personalityNames[1])} alt={personalityNames[1]} className="personality_image" />
                            <h2 className="personality_name">{personalityNames[1]}</h2>
                            <p className="personality_description">{getPersonalityDescription(personalityNames[1])}</p>
                            <button className="personality_button2" onClick={careers2}>Check Careers That Suits Your Personality</button> 
                        </div>
                    </div>
                </div>
            </section>




        

        
        
        
        <Footer/>
    </div>   
  )
}
//Function to get personality images
const getPersonalityImage = (personalityName) => {
  switch (personalityName) {
      case 'Artistic':
          return artistic;
      case 'Conventional':
          return conventional;
      case 'Enterprising':
          return enterprising;
      case 'Investigative':
          return investigative;
      case 'Realistic':
          return realistic;
      case 'Social':
          return social;
      default:
          return '';
  }
};

// Function to get personality description based on personality name
const getPersonalityDescription = (personalityName) => {
  switch (personalityName) {
      case 'Conventional':
          return "Methodical and organized, preferring structured environments where they can apply their attention to detail and administrative skills effectively. They thrive in roles such as accountants, office managers, or data analysts.";
      case 'Realistic':
          return "Practical and hands-on individuals who excel in technical fields requiring tangible problem-solving abilities. They are often found in professions such as engineering, carpentry, or mechanics.";
      case 'Artistic':
          return "Creative and expressive individuals who possess a strong imagination and artistic flair. They thrive in roles that allow them to showcase their creativity, such as graphic design, writing, or performing arts.";
      case 'Investigative':
          return "Analytical and curious thinkers who enjoy solving complex problems and conducting research. They excel in scientific or academic fields, including professions like scientists, researchers, or analysts.";
      case 'Social':
          return "Empathetic and people-oriented individuals who excel in interpersonal communication and enjoy helping others. They thrive in roles that involve working with people, such as counseling, teaching, or social work.";
      case 'Enterprising':
          return "Ambitious individuals with strong leadership skills. They are often found in entrepreneurial roles or positions that require negotiation and strategic planning, such as sales, marketing, or business management.";
      default:
          return "";
  }
}
export default Questionnaire