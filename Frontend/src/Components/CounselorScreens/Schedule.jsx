import { Link} from 'react-router-dom';
import React, {useState , useEffect }  from 'react';
import './Schedule.css';


export default function Schedule(){
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
                const currentTime = new Date();
                const pendingBookings = data.filter((booking) => {
                    if (booking.status === "approved") {
                        const [startDate] = booking.appointmentDate[0].date.split(" ");
                        const [startTime, endTime] = booking.appointmentDate[0].timeSlot.split(" to ");
                        const [startHour, startMinute] = startTime.split(":");
                        const [endHour, endMinute] = endTime.split(":");
                        
                        const bookingEndTime = new Date(startDate);
                        bookingEndTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);
    
                        return currentTime < bookingEndTime; // Filter out bookings where current time is after the end time
                    }
                    return false; // Filter out bookings that are not approved
                });
                setUserBookings(pendingBookings);
            })
            .catch((error) => {
                console.error('Error fetching user bookings:', error);
            });
    };
    
    
    
    

    const IdPage = (e) => {
        e.preventDefault();
        window.location.href = "./EnterId";
    }
    

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
               someDate.getMonth() === today.getMonth() &&
               someDate.getFullYear() === today.getFullYear();
    }
    const isCurrentTimeSlot = (timeSlot) => {
        const currentTime = new Date();
        const [timeStart, timeEnd] = timeSlot.split(" to ");
    
        // Extracting start time information
        const [startHour, startMinute, startMeridiem] = timeStart.split(/:| /).map(part => isNaN(part) ? part : parseInt(part));
        const startHour24 = startMeridiem === "PM" && startHour !== 12 ? startHour + 12 : startHour;
        
        // Extracting end time information
        const [endHour, endMinute, endMeridiem] = timeEnd.split(/:| /).map(part => isNaN(part) ? part : parseInt(part));
        const endHour24 = endMeridiem === "PM" && endHour !== 12 ? endHour + 12 : endHour;
    
        const slotStartTime = new Date();
        slotStartTime.setHours(startHour24, startMinute, 0, 0);
        const slotEndTime = new Date();
        slotEndTime.setHours(endHour24, endMinute, 0, 0);
    
        const isCurrent = currentTime >= slotStartTime && currentTime <= slotEndTime;
        const isPast = currentTime > slotEndTime;
    
        return { isCurrent, isPast };
    }

    useEffect(() => {
        if (counselor && counselor.availability) {
            const updatedAvailability = counselor.availability.map(dayAvailability => {
                const updatedTimeSlots = dayAvailability.time_slots.map(async slot => {
                    const { isPast } = isCurrentTimeSlot(slot.time);
                    if (isPast && slot.available === "no") {
                        try {
                            console.log(dayAvailability.day)
                            console.log(slot.time)
                            const response = await fetch("http://localhost:3002/updateAvailability", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    "Access-Control-Allow-Origin": "*",
                                },
                                body: JSON.stringify({
                                    counselorId: counselor._id,
                                    day: dayAvailability.day,
                                    time_Slot: slot.time,
                                }),
                            });
                            const data = await response.json();
                            console.log(data); // Log the response from the server
                        } catch (error) {
                            console.error('Error updating availability:', error);
                        }
                    }
                });
                return Promise.all(updatedTimeSlots);
            });
        }
    }, [userBookings]);
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
            {/* <button on onClick={IdPage}>Start</button> */}
            <h3 className='counselorRequests'>My Schedule</h3>
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
                                <p >{booking.user.email}</p>
                                <p >{new Date(booking.appointmentDate[0].date).toLocaleDateString()}</p>
                                <p >{booking.appointmentDate[0].timeSlot}</p>
                                <div style={{marginRight:'4%'}}>
                                    {/* {isToday(new Date(booking.appointmentDate[0].date)) && (
                                        <button className="call-button" onClick={IdPage}>Start Call</button>
                                    )} */}
                                    {isCurrentTimeSlot(booking.appointmentDate[0].timeSlot).isCurrent && ( 
                                        <button className="call-button" onClick={IdPage}>Start Call</button>
                                    )} 
                                </div>
                            </div>
                        ))}
                </div>
        </div>
        
    )
}