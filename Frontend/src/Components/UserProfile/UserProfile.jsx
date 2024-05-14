import React, { Component, useState , useEffect } from 'react';
import './UserProfile.css';
import { Link,useNavigate } from 'react-router-dom';
import { add_user_profile_icon } from '../../assets/index-assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const  App = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [image, setImage] = useState("");

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
      // Set image state if image exists in userData
      if (data.data && data.data.image) {
        setImage(data.data.image);
      }
    }));
  },[]);
 
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  }

  const feedback = () => {;
    window.location.href = "./feedback";
  }
  const chatboard = () => {
    window.location.href = "./Chatboard";
  }
  const requests = () => {
    window.location.href = "./Requests";
  }



 const convertToBase64 = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Set the base64 encoded image data
      setImage(reader.result);
      // Send the base64 encoded image data to the server
      fetch("http://localhost:3002/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          id: userData._id,
          image: reader.result }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data); // Handle the response from the server if needed
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
    return (
      
      <div className="user-app-container">
        <div className="user-left-section">
          <div className="user-back_logo">
            <Link to="/main2">
              <FontAwesomeIcon icon={faArrowLeft} className="user-back-icon" />
            </Link>
            <div className="user-logo">
              Talent <span className="user-Brown">Trek</span>
            </div>
          </div>
          <div class="user-list">
              <a href="#profile" className="user_boldness">
                Profile
              </a>
              <br />
              <a href="#feedback" className="user_menu" onClick={feedback}>
                Feedback/Complaint
              </a>
              <br />
              <a href="#chatboard" className="user_menu" onClick={chatboard}>
                Chatboard
              </a>
              <br />
              <a href="#requests" className="user_menu" onClick={requests}>
                View Requests
              </a>
              <br />
              <a href="#logout" className="user_menu" onClick={logOut}>
                Logout
              </a>
          </div>

          <div className="user-footer">
            <p>&copy; 2023 TalentTrek</p>
            <p>talenttrek58@gmail.com</p>
          </div>
        </div>

        <div className="user_right_section">
          <h1 className="user-profile">My Profile</h1>
          <div className="user_blur_container">
            <div className="user-upper-section">
             <span className="pass-space" onClick={() => navigate("/updatepassword",{state: userData})}>        <FontAwesomeIcon icon={faUserPlus} /> Edit Details</span>
            </div>
            <div className="user_lower_section">
              <div className="user-user-profile">

              <div className="user-user-image">
                <br /><br />
                {/* Hidden file input */}
                <input type="file" id="picture" name="picture" accept="image/*" onChange={convertToBase64} style={{ display: 'none' }} />
                {/* Upload image icon */}
                <label htmlFor="picture" className="upload-icon">
                  {image === "" || image === null ? (
                    <img src={add_user_profile_icon} alt="Upload" />
                  ) : (
                    <img src={image} alt="Chosen" />
                  )}
                </label>
              </div>


                <div className="user-divider"></div>


                <div className="user-user-details">
                  <br />
                  <h2 className="user-details"> {userData.name}</h2>
<br />
                  <p className="user-details">
                    <span style={{ fontWeight: 'bolder' }}> Age:</span>{userData.age}
                  </p>
<br />
                  <p className="user-details">
                    <span style={{ fontWeight: 'bolder' }}> Email:</span>{userData.email}
                  </p>

                  {/*<p className="user-details">
                    <span  style={{ fontWeight: 'bolder' }}> Password:</span>{userData.password}
                    
    </p>*/}
<br />
                  <p className="user-details">
                    <span style={{ fontWeight: 'bolder' }}> DOB:</span>{userData.dateOfBirth}
                  </p>
<br />
                  <p className="user-details">
                    <span style={{ fontWeight: 'bolder' }}> Contact:</span>{userData.contact}
                  </p>
<br />
                  <p className="user-details">
                    <span style={{ fontWeight: 'bolder' }}> City:</span>{userData.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default App;
