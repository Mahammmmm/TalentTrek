import React ,{useState,useEffect} from 'react';
import './Home.css';
import {profile,text,calender,counseling} from '../../assets/index-assets'
import Footer from "../Footer/Footer";
import Navbar from "./Navbar"
import { Link } from 'react-router-dom';


const Home = ()=> {
    const [counselor, setCounselor] = useState("");

    useEffect(() => {
        const token = window.localStorage.getItem("Counselortoken");
    
        if(token){
          fetch("http://localhost:3002/CounselorsData",{
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
            setCounselor(data.data);
          }));
        }
        
      });
    return (
        <div >
            <nav className="CounselorNav_nav">
                <a href="/CounselorHome" className="CounselorNav_site-title">Talent<span className="CounselorNav_trek">Trek</span></a>
                <ul>
                    <li >
                        <Link to='/Messages'><a> Messages</a></Link>
                    </li>
                    <li>
                    <Link to='/Schedule'><a> Schedule</a></Link>
                    </li>
                    <li>
                    <Link to='/Profile'><a> Profile</a></Link>
                    </li>
                </ul>
            </nav>

            <h2 className='CounsellorHome_heading'>Welcome to your Couselling Console</h2>

            <div className='CounsellorHome_main'>
                <div className='CounsellorHome_image-container'>
                    <img src={counseling} alt="Logo" className='CounsellorHome_logo' />
                </div>
                <div className='CounsellorHome_text-container'>
                    <h1 className='CounsellorHome_mission'>Mission & Values</h1><br />
                    <p>We believe in helping individuals discover their strengths, explore diverse career paths, and achieve their full potential.</p>
                </div>
            </div>

            <div className='CounsellorHome_main2'>
                <h2 className='CounsellorHome_about'>About our website</h2>
                <p className='CounsellorHome_paragraph'>Our mission is to empower individuals to make informed career choices and navigate their professional journeys with confidence. We are committed to providing personalized guidance, fostering growth, and fostering a supportive environment where every individual's aspirations are valued.</p>
                
            </div>

            <div className="CounsellorHome_horizontal-line-container">
                <div className="CounsellorHome_circle-container">
                    <div className="CounsellorHome_circle1">
                        <img src={profile} alt="Profile" className="CounsellorHome_logo CounsellorHome_profile-logo" />
                    </div>
                    <div className="CounsellorHome_circle2">
                        <img src={text} alt="Text" className="CounsellorHome_logo CounsellorHome_text-logo" />
                    </div>
                    <div className="CounsellorHome_circle3">
                        <img src={calender} alt="Schedule" className="CounsellorHome_logo CounsellorHome_schedule-logo" />
                    </div>
                </div>
                <div className="CounsellorHome_horizontal-line"></div>
            </div>

            <div class="CounsellorHome_small-box-container">
                <div class="CounsellorHome_small-box1">
                    <a href='/profile' className='CounsellorHome_links'><p>View Profile</p></a>
                </div>
                <div class="CounsellorHome_small-box2">
                    <a href='/messages' className='CounsellorHome_links'><p>View Messages</p></a>
                </div>
                <div class="CounsellorHome_small-box3">
                    <a href='/schedule' className='CounsellorHome_links'><p>View Schedule</p></a>
                </div>
            </div>


            <Footer/>
            
            
        </div>
    );
}
export default Home