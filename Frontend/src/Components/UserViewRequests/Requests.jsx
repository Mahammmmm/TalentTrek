import React, { Component, useState , useEffect } from 'react';
import './Requests.css';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Requests = () => {
    const [userBookings, setUserBookings] = useState([]);
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
          fetchUserBookings(data.data._id);
        }));
      },[]);

      const fetchUserBookings = (userId) => {
        fetch(`http://localhost:3002/getbookings?userId=${userId}`)
            .then((res) => res.json())
            .then((data) => {
                const currentDate = new Date();
                const filteredBookings = data.filter((booking) => {
                    const bookingDate = new Date(booking.appointmentDate[0].date);
                    return currentDate <= bookingDate; // Filter out bookings where current date is greater than booking date
                });
                setUserBookings(filteredBookings);
            })
            .catch((error) => {
                console.error('Error fetching user bookings:', error);
            });
    };
    



      const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./login";
      }
      const profile = () => {;
        window.location.href = "./userprofile";
      }
      const feedback = () => {;
        window.location.href = "./feedback";
      }
      const chatboard = () => {
        window.location.href = "./Chatboard";
      }
      


    return(
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
                    <a href="#profile" className="user_menu" onClick={profile}>
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
                    <a href="#requests" className="user_boldness">
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
                <h1 className="user-profile">My Requests</h1>
            
                <div className="user-booking-list">
                        <div className="booking-heading">
                            <p>Counselor</p>
                            <p>Contact</p>
                            <p>Date</p>
                            <p>Time</p>
                            <p style={{marginRight:'5%'}}>Status</p>
                        </div>
                        {userBookings.map((booking, index) => (
                            <div className="booking-details" key={index}>
                                <p>{booking.counselor.name}</p>
                                <p style={{marginLeft:'5%'}}>{booking.counselor.phoneNumber}</p>
                                <p style={{marginLeft:'3%'}}>{new Date(booking.appointmentDate[0].date).toLocaleDateString()}</p>
                                <p>{booking.appointmentDate[0].timeSlot}</p>
                                <p style={{marginRight:'5%'}} className={getClassForStatus(booking.status)}>{booking.status}</p>
                            </div>
                        ))}
                </div>
            </div>
      </div>
    )
}
// Function to return CSS class based on booking status
const getClassForStatus = (status) => {
    switch (status) {
        case 'pending':
            return 'pending-status';
        case 'approved':
            return 'approved-status';
        case 'cancelled':
            return 'cancelled-status';
        default:
            return '';
    }
};

export default Requests