import React ,{useState,useEffect} from 'react'
import "./BookCounselor.css"
import {user,FemaleCounselor,MaleCounselor,RatingStar,ArrowIcon} from '../../assets/index-assets'
import { Link,useParams  } from 'react-router-dom';
import Footer from "../Footer/Footer";
import Calendar from 'react-calendar';


const Counselling = () => {

    
    const { counseloremail } = useParams();
    const [userData, setUserData] = useState("");
    const [counselor, setCounselor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableDays, setAvailableDays] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [selectedDay,setselectedDay]=useState("")
    const [bookingSuccess, setBookingSuccess] = useState(false);

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
                
                const filteredCounselor = data.find(counselor => counselor.email === counseloremail);
                setCounselor(filteredCounselor);
                console.log("Counselors data",counselor)
            })
            .catch(error => {
                console.error('Error fetching counselor data:', error);
            });
    }, [counseloremail]);

    useEffect(() => {
        // Filter available days for the counselor
        if (counselor) {
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const currentDate = new Date();
            const availableDays = counselor.availability
                .map(slot => {
                    const dayIndex = daysOfWeek.indexOf(slot.day);
                    const currentDateCopy = new Date(currentDate);
                    const daysToAdd = (dayIndex - currentDate.getDay() + 7) % 7;
                    currentDateCopy.setDate(currentDateCopy.getDate() + daysToAdd);
                    return currentDateCopy;
                });
            setAvailableDays(availableDays);
            
        }
    }, [counselor]);
    

    

    useEffect(() => {
        if (counselor && selectedDay) {
            const selectedDaySlots = counselor.availability.find(slot => slot.day === selectedDay);
            if (selectedDaySlots) {
                const filteredTimeSlots = selectedDaySlots.time_slots.filter(slot => slot.available === "yes");
                setAvailableTimeSlots(filteredTimeSlots);
            }
        }
    }, [counselor, selectedDay]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setselectedDay(date.toLocaleDateString('en-US', { weekday: 'long' }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem("token");
        if (!token) {
            console.error('User not authenticated');
            return;
        }
        fetch('http://localhost:3002/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                counselorId: counselor._id,
                userId: userData._id,
                appointmentDate: selectedDate,
                timeSlot: selectedTimeSlot
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit booking');
            }
            return response.json();
        })
        .then(data => {
            console.log('Booking submitted successfully:', data.booking);
            setBookingSuccess(true);
        })
        .catch(error => {
            console.error('Error submitting booking:', error);
        });
    };

    
    if (!counselor) {
        return null; // Render nothing until the counselor data is fetched
    }

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
                        <h1> <br />Book a Counselor</h1>
                        <p>Discover your true potential with our personalized career counseling sessions, <br />where expert guidance meets individual aspirations to chart a path towards success and fulfillment</p> 
                    </div>
                </section>




                <section className='counselling_bg4'>
                <div className="counselor-info-container">
                    <div className="counselor-card2">
                        <img
                            src={counselor.gender === 'Male' || counselor.gender === 'male' ? MaleCounselor : FemaleCounselor}
                            alt="Counselor Image"
                            className="counselor-image2"
                        />
                        <h3>{counselor.name}</h3>
                        <h6 style={{ fontWeight: 'bold'}}> {counselor.email}</h6><br />
                        <p> <span style={{ fontWeight: 'bold' }}>Contact:</span> <br />{counselor.phoneNumber}</p><br />

                        <p> <span style={{ fontWeight: 'bold' }}>Specialization:</span> <br />{counselor.specialization.join(', ')}</p><br />
                        <p> <span style={{ fontWeight: 'bold' }}>Experience: </span><br /> {counselor.experience} </p><br />
                        <p><span style={{ fontWeight: 'bold' }}>Ratings:</span> <br /> {counselor.ratings}</p>
                    </div>

                    <div className="booking-section">
                        <br /><br />
                        <h1>Book a Session</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" defaultValue={userData.name}  required />
                            </div><br />
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" defaultValue={userData.email} required />
                            </div><br />
                            <div className="form-group">
                                <label htmlFor="day">Select a Day:</label>
                                <select id="day" onChange={(e) => handleDateChange(new Date(e.target.value))} required>
                                    <option value="">Select a Day</option>
                                    {availableDays.map((day, index) => (
                                        <option key={index} value={day}>{day.toLocaleDateString()}</option>
                                    ))}
                                </select>
                                {selectedDay && (
                                    <div>
                                        <label htmlFor="timeSlot">Select a Time Slot:</label>
                                        <select id="timeSlot" onChange={(e) => setSelectedTimeSlot(e.target.value)} required>
                                            <option value="">Select a Time Slot</option>
                                            {availableTimeSlots.map((timeSlot, index) => (
                                                <option key={index} value={timeSlot.time}>{timeSlot.time}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <br />
                            <button className="sessionButton" type="submit">Request Session</button>
                        </form>
                        <br />
                        
                        {bookingSuccess && <p style={{marginLeft:'25%',fontWeight:'bold'}}>Request sent successfully!</p>}
                    </div>

                </div>
            </section>



            <Footer/> 
        </div>
        
    )
    

}
export default Counselling