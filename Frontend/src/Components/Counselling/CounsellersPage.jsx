import React ,{useState,useEffect} from 'react'
import "./CounsellersPage.css"
import {user,FemaleCounselor,MaleCounselor,RatingStar,ArrowIcon} from '../../assets/index-assets'
import { Link } from 'react-router-dom';
import Footer from "../Footer/Footer";


const Counselling = () => {


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


    const [counselors, setCounselors] = useState([]);

    useEffect(() => {
        // Fetch counselor data from the backend
        fetch('http://localhost:3002/getCounselors')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch counselor data');
                }
                return response.json();
            })
            .then(data => {
                
                setCounselors(data);
                console.log("Counselors data",counselors)
            })
            .catch(error => {
                console.error('Error fetching counselor data:', error);
            });
    }, []);


    
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    


    return(
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






                <section className='counselling_bg'>
                    <div class="content2">
                        <h1>Career Counseling That Paves the Way Forward</h1>
                        
                    </div>
                </section>






                <section className='counselling_bg2'>
                    <div className='content3'>
                        <h1> <br />Find a Counselor</h1>
                        <p>Discover your true potential with our personalized career counseling sessions, <br />where expert guidance meets individual aspirations to chart a path towards success and fulfillment</p> 
                    </div>
                </section>




                <section className='counselling_bg3'>
                    {counselors.map((counselor) => (
                    <div key={counselor._id} className="counselor-card" >
                        <img
                            src={counselor.gender === 'Male' || counselor.gender === 'male'? MaleCounselor : FemaleCounselor}
                            alt="Counselor Image"
                            className="counselor-image"
                        />
                        <h3>{counselor.name}</h3>
                        <h6 style={{ textAlign:'center' }}> {counselor.email}</h6><br />
                        <p style={{ textAlign:'center' }}> <span style={{ fontWeight: 'bold'}}>Contact:</span> <br />{counselor.phoneNumber}</p><br />

                        <p style={{ textAlign:'center' }}> <span style={{ fontWeight: 'bold' }}>Specialization:</span> <br />{counselor.specialization.join(', ')}</p><br />
                        <p style={{ textAlign:'center' }}> <span style={{ fontWeight: 'bold' }}>Experience: </span><br /> {counselor.experience} </p><br />
                        <div className="rating-container">
                                <p>Rating:</p>
                                <div className="rating-star">
                                    <img src={RatingStar} alt="Rating Star" />
                                    <p>{counselor.ratings}</p>
                                </div>
                        </div>
<br />
                        {/* <button className="arrow-button" onClick={bookCounselor}> </button> */}
                        <Link className="arrow-button" to={`/BookCounselor/${encodeURIComponent(counselor.email)}`}></Link>
                    </div>
                ))}
                </section>



            <Footer/> 
        </div>
        
    )
    

}
export default Counselling