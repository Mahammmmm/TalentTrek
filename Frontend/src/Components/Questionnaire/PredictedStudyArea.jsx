import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./PredictedCareers.css"
import Footer from "../Footer/Footer";
import {user,career_prediction_image,career_prediction_background} from "../../assets/index-assets"

const Questionnaire = () => {

    const [userData, setUserData] = useState("");
    const [recommendedCareers, setRecommendedCareers] = useState([]);
    const [personality,setPersonality]=useState("");
    const [uniqueStudyAreas, setUniqueStudyAreas] = useState([]);


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
        const response = await fetch('http://localhost:5000/predict-career', {
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
        console.log('JSON Data:', jsonData);

        setPersonality(jsonData.personality1.personality)
        console.log('Personality',personality)

        setRecommendedCareers(jsonData.personality1.recommended_careers)
        console.log('Study Areas:', recommendedCareers);

        extractUniqueStudyAreas(jsonData.personality1.recommended_careers);
        
       
      } catch (error) {
        console.log('Error', error);
      }
    };
    
    const extractUniqueStudyAreas = (recommendedCareers) => {
        const studyAreas = recommendedCareers.map(career => career.Study_Area);
        const uniqueAreas = [...new Set(studyAreas)];
        setUniqueStudyAreas(uniqueAreas);
    };


  return (

    <div>
        <header>
        <nav className='nav_first'>
            <div>
                <a href='/' className='logo2'>
                    Talent<span className='brown2'>Trek</span>
                </a>
            </div>
            { <div>
          <ul>
          <li>
            <Link to="/Messages" className="noUnderline">Messages</Link>
          </li>

          <li>
            <Link to="/q1" className="noUnderline">Career Test</Link>
          </li>

          <li>
            <Link to="/CounsellersPage" className="noUnderline">Counsellors</Link>
          </li>

          <li>
            <Link to="/viewinstitutes" className="noUnderline">Universities</Link>
          </li>
          <li>
            <Link to="/resumetemplates2" className="noUnderline">Resume Builder</Link>
          </li>

          </ul>
          </div> }
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

        </header>


      <section className='QsrRst_Sec1'>
        <div className='QsrRstImgContainer'>
        <img src={career_prediction_background} alt="Image 2" className='QsrRstIMG'/>
            
            <div className='QsrRstTextOverlay1'>
                <p className="two-color-text1">Which Career</p>
                <p className="two-color-text2"> Best Suit Your Personality Type</p>
            </div>
            <img src={career_prediction_image} alt="Career Prediction" className='QsrRstAboveIMG'/>
        </div>
      </section>


        

      <section className='cr_ThirdContainer'>
        <div className='cr_circle circle1'>
            <p className="cr_circle-text"><span style={{fontSize:'55px',fontWeight:'bolder',textAlign: 'left'}}>YOU</span><br/>Your <br /> Personality <br /> Type</p>
        </div>
        <div className='cr_circle circle2'>
            <p className="cr_circle-text2"><span style={{fontSize:'35px',fontWeight:'bolder',textAlign: 'left'}}>A CAREER</span><br/>Compatible <br /> work <br /> environment</p>
        </div>
        <div className='cr_intersection'>
            <p className="cr_vertical-text">MATCH</p>
        </div>
    </section>



    <section id='jobtable' className='cr_jobtabel'>
                <div className='cr_tablecont2'>
                    <div className="cr_tblcontainer2">
                        <table>
                            <thead className="fixed-header">
                                <tr>
                                    <th>Study Areas for <span style={{color:"#a8d19c"}}>{personality}</span> Personality</th>
                                    <th>Careers</th>
                                </tr>
                            </thead>
                            <tbody className="cr_tblcontainer3">
                                {uniqueStudyAreas.map((area, index) => (
                                    <tr key={index}>
                                        <td className='tabledata'>{area}</td>
                                        <td className='tabledata2' >
                                          
                                        <Link to={`/PredictedCareers/${encodeURIComponent(area)}`}>
                                          View Careers
                                        </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>





        

        
        
        
        <Footer/>
    </div>   
  )
}

export default Questionnaire