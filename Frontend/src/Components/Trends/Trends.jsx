import React ,{useState,useEffect} from 'react'
import "./Trends.css"
import { user,Senior_Engineer,Quality_Engineer,Psychiatric_Mental_Health_Nurse_Practitioner,mechanical_engineer,Mental_Health_Technician,Data_Engineer,Behavioral_Health_Professional,attorny,Controller,Psychiatric_Nurse,Senior_Accountant,Real_Estate_Analyst,Civil_Engineer,Psychiatrist,Medical_Director,Construction_Project_Manager,Supply_Chain_Specialist,Tax_Manager,Electrical_Engineer} from '../../assets/index-assets'
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
                                <p>{getDescription(career)}</p>
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
        case 'Mechanical Engineer':
            return mechanical_engineer;
        case 'Attorney':
            return attorny;
        case 'Behavioral Health Professional':
            return Behavioral_Health_Professional;
        case 'Quality Engineer':
            return Quality_Engineer;
        case 'Mental Health Technician':
            return Mental_Health_Technician;
        case 'Senior Engineer':
            return Senior_Engineer;
        case 'Data Engineer':
                return Data_Engineer;
        case 'Psychiatric Mental  Health Nurse Practitioner':
            return Psychiatric_Mental_Health_Nurse_Practitioner;
        case 'Electrical Engineer':
            return Electrical_Engineer;
        case 'Tax Manager':
            return Tax_Manager;
        case 'Supply Chain Specialist':
            return Supply_Chain_Specialist;
        case 'Construction Project Manager':
            return Construction_Project_Manager;
        case 'Medical Director':
            return Medical_Director;
        case 'Controller':
            return Controller;
        case 'Psychiatrist':
            return Psychiatrist;
        case 'Real Estate Analyst':
            return Real_Estate_Analyst;
        case 'Mental Health Therapist':
            return Mental_Health_Technician;
        case 'Senior Accountant':
            return Senior_Accountant;
        case 'Psychiatric Nurse':
            return Psychiatric_Nurse;
        case 'Civil Engineer':
            return Civil_Engineer;
        default:
            return '';
    }
  };

  
//Function to get personality images
const getDescription = (career) => {
    switch (career) {
        case 'Mechanical Engineer':
            return "The work of mechanical engineers plays a crucial role in shaping the technology and infrastructure that drive our modern world";
        case 'Attorney':
            return "The best lawyers are creative. Your ability to think creatively can make the difference between finding a unique solution or ultimately losing in court";
        case 'Behavioral Health Professional':
            return "Behavioral health professionals play a crucial role in promoting mental well-being. They often provide counseling and therapy sessions";
        case 'Quality Engineer':
            return "Quality engineers review established processes in order to find manufacturing and cost optimizations";
        case 'Mental Health Technician':
            return "A Mental Health Technician is a professional who provides support to mental healthcare professionals in hospitals, private institutions or patient residences";
        case 'Senior Engineer':
            return "Senior Engineer provide technical supervision and technical and administrative support and guidance to other engineers";
        case 'Data Engineer':
                return "Data engineers work in a variety of settings to build systems that collect, manage, and convert raw data into usable information";
        case 'Psychiatric Mental  Health Nurse Practitioner':
            return "They manage a wide array of mental health conditions, often employing strategies such as prescribing medications, psychotherapy, and counseling";
        case 'Electrical Engineer':
            return "Electrical engineers design, develop, test, and supervise the manufacture of electrical equipment";
        case 'Tax Manager':
            return "Tax managers oversee their clients' tax planning, preparation, and filing. They build and maintain relationships with businesses and individuals to provide tax support or services";
        case 'Supply Chain Specialist':
            return "A Supply Chain Specialist coordinates shipments and works to improve supply chain processes at a company or organization";
        case 'Construction Project Manager':
            return "Construction manager oversee work schedules and coordinate subcontractors, determine material and labour costs, regularly report progress to clients and stakeholders";
        case 'Medical Director':
            return "Recruiting and managing physicians, nurses, paramedics and other medical and non-medical staff";
        case 'Controller':
            return "Protects assets by establishing, monitoring, and enforcing internal controls. Monitors and confirms financial conditions";
        case 'Psychiatrist':
            return "Psychiatrists are trained physicians who specialize in mental health. They evaluate, diagnose, and treat psychiatric disorders";
        case 'Real Estate Analyst':
            return "Real estate analysts manage the real estate investments of organizations that have significant property holdings";
        case 'Mental Health Therapist':
            return "A mental health therapist is a professional who specializes in treating mental health conditions and emotional difficulties";
        case 'Senior Accountant':
            return "Senior Accountants take ownership of reporting costs, productivity, margins and expenditures for companies and organizations";
        case 'Psychiatric Nurse':
            return "Psychiatric nurse thus include coordinator of community development, psychotherapist, mental health educator";
        case 'Civil Engineer':
            return "Civil engineers create, improve and protect the environment in which we live. They plan, design and oversee construction and maintenance of buildings";
        default:
            return '';
    }
  };
export default Trends