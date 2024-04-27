import React ,{useState,useEffect} from 'react'
import "./Header2.css"
import { header2_background,careeer,careeer1,user,CareerBG3,unibg,resumebg3,Ellipse14,BooksImage1} from '../../assets/index-assets'
import { Link } from 'react-router-dom';
import Footer from "../Footer/Footer";


const Header = () => {



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
  return (
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