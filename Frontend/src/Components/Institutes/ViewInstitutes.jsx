import React from 'react';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import "./ViewInstitutes.css"
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
  
  
  

    const [universities , setUniversities] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3002/getUniversities')
        .then(universities => setUniversities(universities.data))
        .catch(err => console.log(err))
    },[])

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredInstitutes = universities.filter((institue) => {
      return (
        institue.University_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institue.University_City.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institue.University_Address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });


  return (


    <div >
        <nav className='navbar2'>
            <div>
                <a href='#' className='logo2'>
                    Talent<span className='brown2'>Trek</span>
                </a>
            </div>
            <div>
              <div class="image-and-text-container2">
                <p className='welcome_uni'>{userData.name}{' '} </p>
                {userData.image ? (
                  <Link to="/userprofile"><img src={userData.image} alt='UserImage' className='UserImage_uni'></img></Link>
                ) : (
                  <Link to="/userprofile"><img src={user} alt='UserIcon' className='UserImage_uni'></img></Link>
                )}
              {/*} */}
              </div>
            </div> 
        </nav>






        <section id='main' className='mainbg'>
            <div className='logocont'>
                <div className='section-center-uni'>
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
                            <img src={item.image} className='career-img-uni' />
                        </article>
                        )
                    })} 
                </div>
                
            </div>   
        </section>







        <section id='profname' className='mainbg2'>

            <div className='titleAndDetail'>
                <h1 className='profname_title'>TalentTrek</h1>
                <div className='profname_quote_cont'>
                    <p  className='profname_quote'>Explore, inquire, and find the perfect institution that resonates with your ambitions, as we present a kaleidoscope of possibilities in the world of higher learning.</p>
                </div>
                
            </div>

        </section>



        <section id='unitable' className='unitabel'>

        <input type="text"  placeholder="Search Institutes" value={searchTerm} onChange={handleSearch} className="search-input" />
         
            <div className='tablecont'>
                <div className="tblcontainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Address</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredInstitutes.map( university =>{
                                    return (
                                    <tr>
                                        <td>{university.University_Name}</td>
                                        <td>{university.University_City}</td>
                                        <td>{university.University_Address}</td>
                                        <td>{university.University_Contact}</td>
                                        <td>
                                        <a href={university.University_Email} target="_blank" rel="noopener noreferrer">
                                        {university.University_Email}
                                        </a>
                                        </td>
                                        
                                        <td>
                                        <a href={university.University_URL} target="_blank" rel="noopener noreferrer">
                                            {university.University_URL}
                                        </a>
                                        </td>
                                    </tr>)
                                })
                            }
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