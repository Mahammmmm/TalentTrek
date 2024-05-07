import React ,{useState,useEffect} from 'react'
import "./Trends.css"
import { user,Artificial_IntelligenceandMachine_Learning,Content_Creation,Urban_Planning_and_Development,Cloud_Computing,OnlineTeachingInstruction,Social_Media_Management,Data_Engineer,Fashion_Designing_and_Merchandising,Environmental_Engineer,Content_Writing_and_Blogging,E_commerce_Management,Cybersecurity,Graphic_Designing,Data_Scienceand_Analytics,Remote_Work_Facilitator,Financial_Analysis,Renewable_Energy_Engineering,Mobile_App_Development,Cryptocurrency_Trading_and_Blockchain_Development,Sustainable_Agriculture_Expert} from '../../assets/index-assets'
import { Link } from 'react-router-dom';
import Footer from "../Footer/Footer";

const Trends = () =>{
    
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if(token){
      fetch("http://localhost:3002/userData",{
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
          token:token,
        }),
      })
      .then((res)=>res.json())
      .then((data=>{
        //console.log(data,"userData");
        setUserData(data.data);
      }));
    }
    
  });

  const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/predictTrends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.predictions) {
                setPredictions(data.predictions);
                console.log("Predicted data:",predictions)
            }
        })
        .catch(error => console.error('Error fetching predictions:', error));
    }, []);


    return(
        <div>
            <header className='header2'>
                <nav >
                    <div className='nav_first'>
                        <a href='#' className='logo'>
                        Talent<span className='brown'>Trek</span>
                        </a>

                        <div class="image-and-text-container">
                        {userData.image ? (
                            <Link to="/userprofile"><img src={userData.image} alt='UserImage' className='UserImage_H2'></img></Link>
                        ) : (
                            <Link to="/userprofile"><img src={user} alt='UserIcon' className='UserImage_H2'></img></Link>
                        )}
                        <p className='welcome'>{userData ? userData.name : "Guest"}{' '} </p>
                        </div>
                    </div>


                    {/* <div>
                    <ul>
                    <li>
                        <a href='#' className="noUnderline"><Link to="/jobs">Jobs</Link></a>
                    </li>

                    <li>
                        <a href='#' className="noUnderline"><Link to="/institutes">Institutes</Link></a>
                    </li>

                    <li>
                        <a href='#' className="noUnderline"><Link to="/resume">Resume Builder</Link></a>
                    </li>

                    <li>
                        <a href='#' className="noUnderline"><Link to="/career">Career Identification</Link></a>
                    </li>
                    <li>
                        
                    </li>

                    </ul>
                    </div> */}
                    </nav>
                </header>





                <section id="Trends" className='trendsbg'>
                    {/* <div class="trendscontent">
                        <h1>Future-Proof Your Career!</h1>
                        <p>Empowering you with insights into the future job market, our platform forecasts the top career trends for the upcoming years, helping you stay ahead and make informed decisions about your professional journey</p>
                    </div> */}
                </section>


                <div>
                    <h1 className='trendingcareereheading'>TRENDING CAREERS FOR 2025</h1>
                </div>

                <section id="Trends" className='DisplayCareers'>
                    <div className="careers-container">
                        <div className='fixedText'>
                            <h1>Insight into Tomorrow's Careers Stay Ahead of the Curve</h1>
                        </div>
                        
                        <div className="cards-container">
                            {predictions.map((career, index) => (
                            <div className="card" key={index}>
                                <img src={getCareerName(career)} alt={career} className="career-icon" />
                                <h5>{career}</h5>
                                {/* <p>{getDescription(career)}</p> */}
                            </div>
                            ))}
                        </div>
                    </div>
                </section>

            <Footer/> 
        </div>
    )
}

//Function to get personality images
const getCareerName = (career) => {
    switch (career) {
        case 'Online Teaching/Instruction':
            return OnlineTeachingInstruction;
        case 'Environmental Engineer':
            return Environmental_Engineer;
        case 'Fashion Designing and Merchandising':
            return Fashion_Designing_and_Merchandising;
        case 'Urban Planning and Development':
            return Urban_Planning_and_Development;
        case 'Social Media Management':
            return Social_Media_Management;
        case 'Content Creation (Blogging, Vlogging)':
            return Content_Creation;
        case 'Software Development':
                return Data_Engineer;
        case 'Cloud Computing Specialist':
            return Cloud_Computing;
        case 'Sustainable Agriculture Expert':
            return Sustainable_Agriculture_Expert;
        case 'Cryptocurrency Trading and Blockchain Development':
            return Cryptocurrency_Trading_and_Blockchain_Development;
        case 'Mobile App Development':
            return Mobile_App_Development;
        case 'Renewable Energy Engineering':
            return Renewable_Energy_Engineering;
        case 'Financial Analysis and Investment Banking':
            return Financial_Analysis;
        case 'Content Writing and Blogging':
            return Content_Writing_and_Blogging;
        case 'Remote Work Facilitator':
            return Remote_Work_Facilitator;
        case 'Graphic Designing':
            return Graphic_Designing;
        case 'Artificial Intelligence and Machine Learning':
            return Artificial_IntelligenceandMachine_Learning;
        case 'Cybersecurity':
            return Cybersecurity;
        case 'E-commerce Management':
            return E_commerce_Management;
        case 'Data Science and Analytics':
            return Data_Scienceand_Analytics;
        default:
            return '';
    }
  };

  
//Function to get personality images
// const getDescription = (career) => {
//     switch (career) {
//         case 'Online Teaching/Instruction':
//             return "";
//         case 'Environmental Engineer':
//             return "";
//         case 'Fashion Designing and Merchandising':
//             return "";
//         case 'Urban Planning and Development':
//             return "";
//         case 'Social Media Management':
//             return "";
//         case 'Content Creation (Blogging, Vlogging)':
//             return "";
//         case 'Software Development':
//                 return "";
//         case 'Cloud Computing Specialist':
//             return "";
//         case 'Sustainable Agriculture Expert':
//             return "";
//         case 'Cryptocurrency Trading and Blockchain Development':
//             return "";
//         case 'Mobile App Development':
//             return "";
//         case 'Renewable Energy Engineering':
//             return "";
//         case 'Financial Analysis and Investment Banking':
//             return "";
//         case 'Content Writing and Blogging':
//             return "";
//         case 'Remote Work Facilitator':
//             return "";
//         case 'Graphic Designing':
//             return "";
//         case 'Artificial Intelligence and Machine Learning':
//             return "";
//         case 'Cybersecurity':
//             return "";
//         case 'E-commerce Management':
//             return "";
//         case 'Data Science and Analytics':
//             return "";
//         default:
//             return '';
//     }
//   };
export default Trends