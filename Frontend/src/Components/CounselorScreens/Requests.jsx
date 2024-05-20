import React, {useState , useEffect } from 'react';
import './Requests.css';
import { Link,useNavigate } from 'react-router-dom';




const Requests = ()=>{
    const [userBookings, setUserBookings] = useState([]);
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
            fetchUserBookings(data.data._id);
          }));
        }
        
      },[]);

      const fetchUserBookings = (counselorId) => {
        fetch(`http://localhost:3002/getUserbookings?counselorId=${counselorId}`)
            .then((res) => res.json())
            .then((data) => {
                const pendingBookings = data.filter(booking => booking.status === "pending");
                setUserBookings(pendingBookings);
                console.log(userBookings)
            })
            .catch((error) => {
                console.error('Error fetching user bookings:', error);
            });
    };

    

    const handleStatusUpdate = (id, request) => {
        const bookingToUpdate = userBookings.find(booking => booking._id === id);
        const bookingDate = new Date(bookingToUpdate.appointmentDate[0].date);
        const bookingDay = bookingDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const day = bookingDay.charAt(0).toUpperCase() + bookingDay.slice(1); 

        fetch("http://localhost:3002/updateBooking", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: id,
                request: request,
                day:day
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            fetchUserBookings(counselor._id);
        })
        .catch((error) => {
            console.error('Error updating booking status:', error);
        });
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);}
    return(
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
              </ul>
            </nav>
            <h3 className='counselorRequests'>Session Requests</h3>
            <div className="counselor-booking-list">
                        <div className="counselor-booking-heading">
                            <p className='FirstName'>Name</p>
                            <p>Email</p>
                            <p>Date</p>
                            <p>Time</p>
                            <p style={{marginRight:'5%'}}>Request</p>
                        </div>
                        {userBookings.map((booking, index) => (
                            <div className="counselor-booking-details" key={index}>
                                <p className='FirstName2'>{booking.user.name}</p>
                                <p className='FirstName'>{booking.user.email}</p>
                                <p className='FirstName'>{new Date(booking.appointmentDate[0].date).toLocaleDateString()}</p>
                                <p className='FirstName'>{booking.appointmentDate[0].timeSlot}</p>
                                <div style={{marginRight:'2%'}} className='arButtons'>
                                    <button className="accept-button" onClick={() => handleStatusUpdate(booking._id, "approved")}>Accept</button>
                                    <button className="reject-button" onClick={() => handleStatusUpdate(booking._id, "cancelled")}>Reject</button>
                                </div>
                            </div>
                        ))}
                </div>
        </div>
    )
    }
export default Requests