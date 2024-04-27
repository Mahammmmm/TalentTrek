import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./ViewJobs.css"
import images from "./logos"
import Footer from "../Footer/Footer";
import {user} from "../../assets/index-assets"


const Questionnaire = () => {


    const [logos]=useState(images);
    const [index,setIndex]=useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(()=>{
      const lastIndex=logos.length-1;
      if(index<0){
        setIndex(lastIndex);
      }
      if(index>lastIndex){
        setIndex(0);
      }
    },[index,logos]);
  
  
    useEffect(()=>{
      let slider = setInterval(()=>{
        setIndex(index+1)
      },2000);
      return()=>{
        clearInterval(slider)
      }
    },[index])




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





   const [jobs , setJobs] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3002/getJobs')
        .then(jobs => setJobs(jobs.data))
        .catch(err => console.log(err))
    },[])

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredJobs = jobs.filter((job) => {
      return (
        job.Job_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.Location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });


    
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
            
          </div>
      
            </div> 
        </nav>









        <section id='main' className='mainbg-job'>
            <div className='logocont'>
                <div className='section-center-job'>
                    {logos.map((item,indexCareer)=>{
                        const {id,image} = item;
                        let position="nextSlide";
                        if(indexCareer===index){
                        position="activeSlide"
                        }
                        if(indexCareer===index-1 || (index===0 && indexCareer===logos.length-1)){
                        position="lastSlide"
                        }
                        return(
                        <article className={position} key={id}>
                            <img src={item.image} className='career-img-job' />
                        </article>
                        )
                    })} 
                </div>
                
            </div>   
        </section>





        <section id='profname' className='mainbg_jonjob'>

            <div className='titleAndDetail_job'>
                <h1 className='profname_title_job'>TalentTrek</h1>
                <div className='profname_quote_cont_job'>
                    <p  className='profname_quote_job'> Your dream job awaits, and our platform is here to guide you toward your professional aspirations.</p>
                </div>
                
            </div>

        </section>




                
        <section id='jobtable' className='jobtabel'>
        <input type="text"  placeholder="Search jobs" value={searchTerm} onChange={handleSearch} className="search-input" />
         
            <div className='tablecont2'>
            
                <div className="tblcontainer2">
                
                   <table>
                        <thead>
                            <tr>
                                <th>Job_Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Link</th>
                                <th>Hiring</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredJobs.map((job) => {
                          return (
                            <tr key={job._id}>
                              <td>{job.Job_Title}</td>
                              <td>{job.company_name}</td>
                              <td>{job.Location}</td>
                              <td>
                                <a href={job.Company_link} target="_blank" rel="noopener noreferrer">
                                  {job.Company_link}
                                </a>
                              </td>
                              <td>{job.Hiring}</td>
                              <td>{job.Date}</td>
                            </tr>
                          );
                        })}
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
