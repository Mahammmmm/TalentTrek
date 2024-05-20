import React, {useState,useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import "./PredictedInstitutes.css"
import Footer from "../Footer/Footer";
import {user,uni_image,uni_background} from "../../assets/index-assets"

const Questionnaire = () => {

    const [userData, setUserData] = useState("");
    const [recommendedCareers, setRecommendedCareers] = useState([]);
    const [recommendedUniversities, setRecommendedUniversities] = useState([]);
    const [personality,setPersonality]=useState("");
    const { careerName } = useParams(); // Retrieve career name from URL parameters


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
        const response = await fetch('http://localhost:5000/predict-career-universities', {
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
    
        setRecommendedCareers(jsonData.personality1.recommended_careers);
        setPersonality(jsonData.personality1.personality)


        // Use the career name to fetch related universities
        const universities = jsonData.personality1.recommended_universities[careerName] || [];
        setRecommendedUniversities(universities);

      } catch (error) {
        console.log('Error', error);
      }
    };
    
    

    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
    


  return (

    <div>
        <header>
      <nav className='nav_first'>
      <div className='nav_toggle' onClick={toggleMenu}>&#9776;</div>
        <div>
          <Link to="/" className='logo2'>Talent<span className='brown2'>Trek</span></Link>
        </div>
        
        <ul className={menuOpen ? 'active' : ''}>
          <li><Link to="/userMessages" className="noUnderline">Messages</Link></li>
          <li><Link to="/q1" className="noUnderline">Career Test</Link></li>
          <li><Link to="/CounsellersPage" className="noUnderline">Counsellors</Link></li>
          <li><Link to="/viewinstitutes" className="noUnderline">Universities</Link></li>
          <li><Link to="/resumetemplates2" className="noUnderline">Resume Builder</Link></li>
        </ul>
        <div className='image-and-text-container2'>
          
          <p className='welcome_uni'>{userData.name} </p>
          <div className='UserImage_uni_container'>
            <Link to="/userprofile">
              <img src={userData.image ? userData.image : user} alt="UserImage" className='UserImage_uni' />
            </Link>
          </div>
        </div>
        
      </nav>
    </header>


      <section className='Inst_Sec1'>
        <div className='InstImgContainer'>
            <div className='InstTextOverlay2'>
                <img src={uni_background} alt="Image 2" className='InstIMG'/>
            </div>
            
            <div className='InstTextOverlay1'>
                <p className="two-color-text1_INST">Navigating Paths, Illuminating Futures</p>
                <p className="two-color-text2_INST"> Our platform is dedicated to guide you through the diverse landscape of educational institutes tailored to your career aspirations.Our curated selection of institutions will illuminate the path to your future success</p>
            </div>
        </div>
      </section>


        



            <section id='jobtable' className='inst_jobtabel'>
                <h1 className='inst_head'>Recommended Institutes for <span style={{color:"#dcb88f"}}> {careerName}</span></h1>
                    <div className="inst_tblcontainer2">
                        <table>
                            <thead>
                                <tr>
                                    <th>University Name</th>
                                    <th>Degree</th>
                                    <th>Fee</th>
                                    <th>City</th>
                                    <th>Contact</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Url</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {recommendedUniversities.map((universityInfo, index) => (
                                    <tr key={index}>
                                        <td className='tabledata'>{universityInfo.university}</td>
                                        <td className='tabledata'>{universityInfo.degree_duration}</td>
                                        <td className='tabledata'>{universityInfo.fee}</td>
                                        <td className='tabledata'>{universityInfo.city}</td>
                                        <td className='tabledata'>{universityInfo.contact_number}</td>
                                        <td className='tabledata'>
                                        <a href={universityInfo.email} target="_blank" rel="noopener noreferrer">
                                        {universityInfo.email}
                                        </a></td>
                                        <td className='tabledata'>{universityInfo.address}</td>
                                        <td className='tabledata'>
                                        <a href={universityInfo.url} target="_blank" rel="noopener noreferrer">
                                        {universityInfo.url}
                                        </a>
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    
                    </div>
            </section>





        

        
        
        
        <Footer/>
    </div>   
  )
}

export default Questionnaire