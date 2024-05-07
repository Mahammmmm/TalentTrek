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
            console.log(data,"userData");
            setCounselor(data.data);
          }));
        }
        
      },[]);

      const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./CounselorLogin";
      }

    return (
        <div>
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
                    <li>
                    <Link><a onClick={logOut}> Logout</a></Link>
                    </li>
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