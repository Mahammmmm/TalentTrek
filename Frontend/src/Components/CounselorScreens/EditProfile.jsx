import { Link } from 'react-router-dom';
import React,{useEffect, useState}  from 'react';
import './EditProfile.css'
import { useLocation } from 'react-router-dom';



export default function EditProfile(){
    const location=useLocation();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [gender,setGender] = useState("");
  const [phoneNumber,setphoneNumber] = useState("");

  useEffect (()=>{
    if (location.state) {
        setName(location.state.name);
        setEmail(location.state.email);
        setPassword(location.state.password);
        setGender(location.state.gender);
        setphoneNumber(location.state.phoneNumber);
    }
}, [location.state])

const updateData = () => {
    console.log(name, email, password, gender, phoneNumber);
    fetch("http://localhost:3002/updateCounselor", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            id: location.state._id,
            name: name,
            email: email,
            password: password,
            gender: gender,
            phoneNumber: phoneNumber,
        }),
    })
        .then((res) => res.json())
        .then((data => {
            console.log("Update response:", data);
            window.location.href = "./Profile"
            
        }));
}

const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
}

const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./CounselorLogin";
  }

    return (
        <div>
            <nav className="CounselorNav_nav">
            <div className="CounselorNav_hamburger" onClick={toggleMenu}>
              {isMenuOpen ? '✖' : '☰'}
            </div>
                <a href="/CounselorHome" className="CounselorNav_site-title">Talent<span className="CounselorNav_trek">Trek</span></a>
                <ul className={`CounselorNav_nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li >
                        <a href='/Messages'> Messages</a>
                    </li>
                    <li>
                    <a href='/CouselorRequests'> Requests</a>
                    </li>
                    <li>
                    <a href='/Schedule'> Schedule</a>
                    </li>
                    <li>
                    <a href='/Profile'> Profile</a>
                    </li>
                    <li><a onClick={logOut}>Logout</a></li>
                </ul>
            </nav>
                <div class="CounslerProfile_container">
                    <div class="CounslerProfile_big-box">
                        <div className='top'>
                            Edit Details
                        </div>
                        
                            <br /><br />
                           <div class="CounslerProfile_row">
                            <label className='CounslerProfile_label'>Name</label>
                            <input
                                className='CounslerProfile_value'
                                type="name"
                                id="name"
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            </div>
                            {/* <div class="CounslerProfile_row">
                                <div class="CounslerProfile_label">Email:</div>
                                <input
                                className='CounslerProfile_value'
                                type="email"
                                id="email"
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div> */}
                            <div class="CounslerProfile_row">
                                <div class="CounslerProfile_label">Password:</div>
                                <input
                                className='CounslerProfile_value'
                                    type="password"
                                    id="password"
                                    defaultValue={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div class="CounslerProfile_row">
                                <div class="CounslerProfile_label">Gender:</div>
                                <div >
                                <select  value={gender} onChange={(e) => setGender(e.target.value)} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                </div>
                            </div>
                            <div class="CounslerProfile_row">
                                <div class="CounslerProfile_label">Phone Number:</div>
                                <input
                                    className='CounslerProfile_value'
                                    type="phoneNumber"
                                    id="phoneNumber"
                                    defaultValue={phoneNumber}
                                    onChange={(e) => setphoneNumber(e.target.value)}
                                />
                            </div>
                            
                            
                            
                            {/* <div class="row">
                                <div class="label">Availability:</div>
                                <div class="value">
                                    <input class="value" type="text" defaultValue="Tuesday, Thursday" />
                                    <p class="note">Separate days with commas (e.g., Monday, Wednesday, Friday)</p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Time Slots:</div>
                                <div class="value">
                                    <textarea class="value" defaultValue="10:00 AM to 10:30 AM - Available&#10;10:30 AM to 11:00 AM - Available"></textarea>
                                    <p class="note">Enter each time slot on a new line in the format: HH:MM AM/PM to HH:MM AM/PM - Availability</p>
                                </div>
                            </div> */}

                            
                            <div className="CounslerProfile_center-button">
                                
                                <button type="submit" className='CounslerProfile_submit' onClick={updateData}>Submit</button>
                            </div>

                
            </div>
        </div>

        </div>
    )
}