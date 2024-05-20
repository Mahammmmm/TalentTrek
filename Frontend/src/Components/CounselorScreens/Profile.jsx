import { Link ,useNavigate} from 'react-router-dom';
import React,{useState,useEffect}  from 'react';
import './Profile.css';

export default function Profile() {

    const navigate = useNavigate();
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
            console.log(data,"counselorData");
            setCounselor(data.data);
          }));
        }
        
      },[]);

      const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./CounselorLogin";
      }
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);}
    return (
        <div>
            <nav className="CounselorNav_nav">
              <div className="CounselorNav_hamburger" onClick={toggleMenu}>
                {isMenuOpen ? '✖' : '☰'}
              </div>
              <a href="/CounselorHome" className="CounselorNav_site-title">Talent<span className="CounselorNav_trek">Trek</span></a>
              <ul className={`CounselorNav_nav-menu ${isMenuOpen ? 'active' : ''}`}>
                <li><a href='/Messages'>Messages</a></li>
                <li><a href='/CouselorRequests'>Requests</a></li>
                <li><a href='/Schedule'>Schedule</a></li>
                <li><a href='/Profile'>Profile</a></li>
                <li><a onClick={logOut}>Logout</a></li>
              </ul>
            </nav>
            <div class="container">
                <div class="big-box">

                    <div className='top' >
                        <a onClick={() => navigate("/EditProfile",{state: counselor})}> Edit Details</a>
                    </div>

                    <div class="name">
                        {counselor.name}
                    </div>
                    <div class="row">
                        <div class="label">Email:</div>
                        <div class="value">{counselor.email}</div>
                    </div><br />
                    {/* <div class="row">
                        <div class="label">Password:</div>
                        <div class="value">ali123</div>
                    </div> */}
                    <div class="row">
                        <div class="label">Gender:</div>
                        <div class="value">{counselor.gender}</div>
                    </div><br />
                    <div class="row">
                        <div class="label">Phone Number:</div>
                        <div class="value">{counselor.phoneNumber}</div>
                    </div><br />
                    <div class="row">
                        <div class="label">Qualifications:</div>
                        <div class="value">{counselor.qualifications ? counselor.qualifications.join(', ') : ''}</div>
                    </div><br />
                    <div class="row">
                        <div class="label">Specialization:</div>
                        <div class="value">{counselor.specialization ? counselor.specialization.join(', ') : ''}</div>
                    </div><br />
                    <div class="row">
                        <div class="label">Experience:</div>
                        <div class="value">{counselor.experience}</div>
                    </div><br />
                    {/* <div class="row">
                        <div class="label">Availability:</div>
                        <div class="value">{counselor.availability ? counselor.availability.map(slot => slot.day).join(', ') : ''}</div>
                    </div><br /> */}
                    {/* <div class="row">
                        <div class="label">Time Slots:</div>
                        <div class="value">
                            <div>10:00 AM to 10:30 AM - Available</div>
                            <div>10:30 AM to 11:00 AM - Available</div>
                            
                        </div>
                    </div> */}
                    <div class="row">
                        <div class="label">Ratings:</div>
                        <div class="value">{counselor.ratings}</div>
                    </div>
        </div>
    </div>

</div>
    
    )
}