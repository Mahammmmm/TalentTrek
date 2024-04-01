import React ,{useState,useEffect} from 'react'
import "./Header.css"
import data from "./data"
import uni from "./universities"
import { Link } from 'react-router-dom';
import {feedback1,resumebg3,comma, CareerBG ,CareerBG2,user} from '../../assets/index-assets'
import Footer from "../Footer/Footer";


const Header = () => {

  const [career]=useState(data);
  const [index,setIndex]=useState(0);

  useEffect(()=>{
    const lastIndex=career.length-1;
    if(index<0){
      setIndex(lastIndex);
    }
    if(index>lastIndex){
      setIndex(0);
    }
  },[index,career]);


  useEffect(()=>{
    let slider = setInterval(()=>{
      setIndex(index+1)
    },2000);
    return()=>{
      clearInterval(slider)
    }
  },[index])




  
  const [unis]=useState(uni);
  const [index2,setIndex2]=useState(0);

  useEffect(()=>{
    const lastIndex2=unis.length-1;
    if(index2<0){
      setIndex2(lastIndex2);
    }
    if(index2>lastIndex2){
      setIndex2(0);
    }
  },[index2,unis]);

  useEffect(()=>{
    let slider2 = setInterval(()=>{
      setIndex2(index2+1)
    },2000);
    return()=>{
      clearInterval(slider2)
    }
  },[index2])




  //const [feedbacks]=useState(feedback);
  const [feedbacks, setFeedbacks] = useState([]);
  const [index3,setIndex3]=useState(0);

  useEffect(() => {
    // Fetch feedback data from the backend API
    fetch('http://localhost:3002/getFeedback')
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedback:', error));
  }, []);

  useEffect(()=>{
    const lastIndex3=feedbacks.length-1;
    if(index3<0){
      setIndex3(lastIndex3);
    }
    if(index3>lastIndex3){
      setIndex3(0);
    }
  },[index3,feedbacks]);

  useEffect(()=>{
    let slider3 = setInterval(()=>{
      //setIndex3(index3+1)
      setIndex3((prevIndex) => (prevIndex + 1) % feedbacks.length);
    },2000);
    return()=>{
      clearInterval(slider3)
    }
  },[feedbacks])


  const handleStarted = (e) => {
    e.preventDefault();
    window.location.href = "./login"
  };

  const handleResume = (e) => {
    e.preventDefault();
    window.location.href = "./resumetemplates"
  };


  return (
    
  <div>
    <header className='header1'>
      <nav >
        <div>
          <a href='#' className='logo'>
            Talent<span className='brown'>Trek</span>
          </a>
        </div>
        <div>
        <ul>
          <li>
            <a href='#' className="noUnderline" >Home</a>
          </li>

          <li>
            <a href='#' className="noUnderline">Careers</a>
          </li>

          <li>
            <a href='#' className="noUnderline">Universities</a>
          </li>

          <li>

            <a href='#' className="noUnderline">Resume Builder</a>
          </li>
        </ul>
        </div>

        
      </nav>

      
      <div className='wrapper'>

        <div className='header_left-section'>
          <div className='headerText'>
              <p className='slogan'>
                    The <span className='brown'>Road</span> <br />To <br />Your <span className='brown'>Dreams</span>
              </p>
            
            <br />
            <p className='headerParagraph'>
                Welcome to TalentTrek! <br />
                Your comprehensive career counseling companion designed to help you unlock your true potential and find the path that leads to your dream career.</p>
                <br />
            <a href='#' className='LoginButton' onClick={handleStarted}>Get Started</a>    
          </div>
        </div>

        <div class="image-container2_diff">
          <div class="image2_diff">
            <div class="face front2">
                    <img src={CareerBG} alt="Rectangle48"  className='header_bg2_diff'/>
            </div>
            <div class="face back2">
                    <img src={CareerBG2} alt="Rectangle48"  className='header_bg2_diff'/>
            </div>
          </div>
        </div>

        <div className='header_right-section'>
        
        <p>.</p>
        </div>
      </div>
    </header>





    <section id='careers' className='careersbg'>
      <div className="career_container">

          <div className="career_upper-section">
            <p>.</p>
          </div>

          <div className="career_middle-section">

            <img src={comma} alt="Rectangle48"  className='comma_bg'/>
            <br /><br /><br /><br />
            <h1 className='career_quote'>IF YOU CAN <br />DREAM IT,<br /> YOU CAN DO IT</h1>

            <div className='section-center'>
             {career.map((item,indexCareer)=>{
                const {id,image,name,descp} = item;
                let position="nextSlide";
                if(indexCareer===index){
                  position="activeSlide"
                }
                if(indexCareer===index-1 || (index===0 && indexCareer===career.length-1)){
                  position="lastSlide"
                }
                return(
                  <article className={position} key={id}>
                      <img src={item.image} alt={name} className='career-img' />
                      <h4>{name}</h4>
                      <p className='descp'>{descp}</p>
                  </article>
                )
             })} 
             <button className='prev' onClick={()=>setIndex(index - 1)}>
              <i className='fas fa-arrow-right'/>Prev
             </button>

             <button className='next' onClick={()=>setIndex(index + 1)}>
              <i className='fas fa-arrow-left'/>Next
             </button>
            </div>


          </div>

          <div className="career_lower-section">
            <p>.</p>
          </div>

      </div>
    </section>





    <section id='unis' className='careersbg'>  
      <div className="uni_container">

          <div className="uni_upper-section">
            <p>.</p>
          </div>


          <div className="uni_middle-section">
            <div className='section-center2'>
              {unis.map((item2,indexUni)=>{
                  const {id,image,name,city,descp} = item2;
                  let position="nextSlide";
                  if(indexUni===index2){
                    position="activeSlide"
                  }
                  if(indexUni===index2-1 || (index2===0 && indexUni===unis.length-1)){
                    position="lastSlide"
                  }
                  return(
                    <article className={position} key={id}>
                        <img src={item2.image} alt={name} className='uni-img' />
                        <h4>{name}</h4>
                        <h5>{city}</h5>
                        <p className='descp'>{descp}</p>
                    </article>
                  )
                })} 
                <button className='prev2' onClick={()=>setIndex(index - 1)}>
                  <i className='fas fa-arrow-right'/>Prev
                </button>

                <button className='next2' onClick={()=>setIndex(index + 1)}>
                  <i className='fas fa-arrow-left'/>Next
                </button>
              </div>

              <h1 className='uni_quote'>Unlocking Futures, Connecting Dreams, <br />Explore the World of Knowledge</h1>
          </div>

          <div className="uni_lower-section">
            <p>.</p>
          </div>

      </div>
    </section>







    <section id='resume' className='careersbg'>
      <div className='resume_container'>
        <div className='resume_left_section'>
          <img src={resumebg3} alt="Rectangle48"  className='resume_bg'/>
            
        </div>

        <div className='resume_right_section'>
          <h1 className='resume_quote'> <span className='resume_quote2'>''</span>  <br /> Crafting <br /> Your <br /> Success Story <br /><br />Your <br /> Journey Begins<br />with <br /> Our Resume <br />Mastery Platform!  <br /><br /> <span className='resume_quote2'>''</span> </h1>
          <button className='resume_btns' onClick={handleResume}>Get Started</button>
        </div>

      </div>
    </section>





    <section id='feedback' className='careersbg'>
      <div className='feedback_container'>
        <div className='feedback_up_section'>
           <p>.</p>
        </div>

        <div className='feedback_down_section'>
          <h1 className='feedback_quote'>Voices Heard, Success Shared <br /> Your <span className='brown'>Feedback</span>  Matters on Our Platform!</h1>
          <div className='section-center3'>
              {feedbacks.map((item,indexCareer)=>{
                  const {id,email,message} = item;
                  let position="nextSlide";
                  if(indexCareer===index3){
                    position="activeSlide"
                  }
                  if(indexCareer===index3-1 || (index3===0 && indexCareer===feedbacks.length-1)){
                    position="lastSlide"
                  }
                  return(
                    <article className={position} key={id}>
                        <img src={user} alt={email} className='fb-img' />
                        <p className='descp'>{message}</p>
                        <p className='uemails'>{email}</p>
                    </article>
                  )
                })} 
              </div>
        </div>
      </div>

    </section>







    <section id='profile' className='careersbg'>
      <div className="profile_container">

        <div className="profile_upper-section">
          <p>.</p>
        </div>

        <div className="profile_middle-section">

          <div className='quote1'>
            <p className='profile_quote1'>Whether you're a recent graduate, contemplating a career change, or simply seeking guidance in your professional journey, TalentTrek is here to support you every step of the way.</p>
          </div>
          
                <h1 className='Appname'>Talent<span style={{ color: '#fcdf8970'}}>Trek</span> </h1>

          <div className='quote2'>
            <p className='profile_quote2'>With our powerful assessment tools, personalized recommendations, and expert resources, you'll gain the clarity and confidence needed to make informed decisions about your future.</p>
          </div>
             
        </div>

        <div className="profile_lower-section">
          <p>.</p>
        </div>

      </div>
    </section>

    <Footer/> 

    </div>
  )
}

export default Header