import React ,{useState,useEffect} from 'react'
import "./Header2.css"
import { header2_background,careeer,careeer1,user,CareerBG3,unibg,resumebg3,Ellipse14,BooksImage1,counselling_bg1} from '../../assets/index-assets'
import { Link } from 'react-router-dom';
import Footer from "../Footer/Footer";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../lib/firebase';

const Header = () => {


  const [userDataFetched,setUserDataFetched]=useState(false);
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
        setUserDataFetched(true)
        
      }));
    }
    
  });

  useEffect(() => {
    if (userDataFetched) {
      // Register user into Firebase
      console.log(userData._id)
      Handle(userData);
    }
  }, [userDataFetched, userData._id]);


  const Handle = async (userData) => {
    try {
      await setDoc(doc(db, "users", userData._id), {
 
        name: userData.name ? userData.name : '',
        email: userData.email ? userData.email : '',
        password: userData.password ? userData.password : '',
        userId: userData._id ? userData._id : userData._id ? userData._id : ''
      });
      console.log("Document added successfully");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }

  





  const handleUni = (e) => {
    e.preventDefault();
    window.location.href = "./viewinstitutes"
  };
  const handleJob = (e) => {
    e.preventDefault();
    window.location.href = "./viewjobs"
  };
  const handleRes = (e) => {
    e.preventDefault();
    window.location.href = "./resumetemplates2"
  };
  const handleEP = (e) => {
    e.preventDefault();
    window.location.href = "./educationform"
  };
  const handleP = (e) => {
    e.preventDefault();
    window.location.href = "./q1"
  };
  const handleCounselling =(e)=> {
    e.preventDefault();
    window.location.href = "./CounsellersPage"
  }
  const handleTrends =(e)=> {
    e.preventDefault();
    window.location.href = "./Trends"
  }



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
            <Link to="/userMessages" className="noUnderline">Messages</Link>
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



      <section className='header2_landing'>
        <div className='header_wrapper2'>
              <div className='header_right'>
                <img src={header2_background} alt="Rectangle48"  className='header_bg3'/>
              </div>
              <div className='header_left'>
                  <p className='slogan2'>
                  If <span style={{color:'black'}}>opportunity</span> doesn’t knock build a door</p>
                
                <br />
                <p className='headerParagraph2'>
                    Welcome to TalentTrek! <br />
                    Your comprehensive career counseling companion designed to help you unlock your true potential and find the path that leads to your dream career.</p>
                    <br />
              
              </div>
              
            </div>
      </section>



    

    

      <section id='Careers' className='carreerbg'>

        <div className='careerlog'>
          <h2 className='cheadingStyle'>Find a career that feels like a calling, <br />where your passion meets purpose</h2>    
        </div>

        <div className='carrecont1'>
          
          <div className='carrerright1'>
            <h2 className='Lquote2'>Harmony in Career Discovery </h2>
            <h2 className='Lquote'>Shaping Careers Based on Your Distinct Personality Blueprint!</h2> 
            <button onClick={handleP} className='btn1_cr'>Get started</button>   
          </div>
          <div className='carrerleft1'>
            <img src={careeer} alt="Image 2" className='imageL'/>
          </div>
        </div>
      </section>



      <section id='Trends' className='trendsBg'>
        <div class="trendsContent">
            <h1>Discover Tomorrow's Trending Careers Today!</h1>
            <p>Empowering you with insights into the future job market, our platform forecasts the top career trends for the upcoming years, helping you stay ahead and make informed decisions about your professional journey</p>
            <button onClick={handleTrends}>Learn More</button>
        </div>
      </section>


    






      <section id='Jobs' className='White'>
        <div className='jobwrapper3'>
            <div class="job_circle">
              <div class="job_text">
                <p >
                  Delivering the most up-to-date listings on job openings in Pakistan
                </p>
                
                <a href='#' className='job_heading' onClick={handleJob}>View Jobs</a>
              </div>
            </div>
            <div className='job_border'>
              <p>.</p>
            </div>
            <div className='job_border2'>
              <p>.</p>
            </div>
            <div className='job_border3'>
              <p>.</p>
            </div>  
        </div>
      </section>
   


    







      <section id='university' className='unibg'>
        <div className='unicont'>
          <div className='unils'>
            <img src={unibg} alt="Rectangle48"  className='uni_bg3'/>
          </div>
          <div className='unirs'>
            <div className='unidet'>
                <h1 className='uni_quote1'>Empowering Futures, Connecting Aspirations</h1>
                <br />
                <p className='uni_p'>Making it easier to find Institutes near you!</p>
                <button className='unibtn' onClick={handleUni}>Explore Institutes</button>
            </div>
          </div>
        </div>
      </section>



      <section id='Counselling' className='counsellingBg'>
        <div class="content">
            <h1>Expert Career Guidance</h1>
            <p>Empowering your career journey with personalized guidance and expert support</p>
            <button onClick={handleCounselling}>Learn More</button>
        </div>
      </section>





      <section id='resume' className='resbg'>
        <div className='resume_container2'>
          <div className='resume_left_section2'>
            <img src={resumebg3} alt="Rectangle48"  className='resume_bg2'/>
              
          </div>

          <div className='resume_right_section2'>
            <h1 className='resume_quote2'> <span className='resume_quote3'>''</span>  <br /> Crafting <br /> Your <br /> Success Story <br /><br />Your <br /> Journey Begins<br />with <br /> Our Resume <br />Mastery Platform!  <br /><br /> <span className='resume_quote2'>''</span> </h1>
            <button className='resume_btns2' onClick={handleRes}>Get Started</button>
          </div>

        </div>
      </section>


    <Footer/> 
  </div>
  )
}

export default Header