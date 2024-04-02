import React, { useState ,useEffect}from 'react';
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import "./ResumeForm_PD.css"


const Questionnaire = () => {

  const navigate = useNavigate();
  const location2 = useLocation();
  
  // Access the data from the location state
  const personalDetailsData = location2.state;



  const [fullName, setFullName] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');


  const isValidContactNumber = (contact) => {
    // Regular expression for the contact number format 0XXX-XXXXXXX
    const contactRegex = /^0\d{3}-\d{7}$/;
    return contactRegex.test(contact);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      fullName !== '' &&
      profession !== '' &&
      city !== '' &&
      country !== '' &&
      isValidContactNumber(phoneNumber) &&
      email !== ''
    ) {
      // Prepare data to send to the server
      const personalDetailsData = {
        fullName,
        profession,
        city,
        country,
        phoneNumber,
        email,
      };

      try {
        // Make a POST request to the server to store personal details
        const response = await fetch('http://localhost:3002/personal-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(personalDetailsData),
        });

        const result = await response.json();

        if (result.status === 'ok') {
          //alert('Form submitted successfully!');
          navigate("/ResumeFormWorkExp",{state: personalDetailsData})  
          
         // window.location.href = './ResumeFormWorkExp';
        } else {
          alert('Error storing personal details. Please try again.');
        }
      } catch (error) {
        console.error('Error storing personal details:', error);
        alert('Error storing personal details. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    window.location.href = "./resumetemplates"
  };

 
      // List of cities
const cities = [
  "Jamshoro", "Karachi", "Lahore", "Larkana", "Multan", "Nawab Shah", "Quetta",
  "Rawalpindi", "Tando Muhammad Khan", "Hyderabad", "Abbottabad", "Bahawal Pur",
  "Bannu", "D.G. Khan", "Faisalabad", "Gilgit", "Haripur", "Islamabad", "Kohat",
  "Mardan", "Mir Pur (AJK)", "Okara", "Peshawar", "Muzaffarabad", "Swabi",
  "Chakdara", "Charsadda", "Havelian", "Lakki Marwat", "Layyah", "Lasbela",
  "Risalpur", "Sukkur", "Taxila", "Khuzdar", "Kala Shah Kaku", "Narowal", "Sahiwal",
  "Mansehra", "Pabbi", "Chakwal", "Wah Cantt", "D.g.khan", "Gwadar", "Hala", "Kotli",
  "Bhimber", "Liaqatpur", "Attock", "Bagh", "Kamra", "Darra Adam Khail", "Naushero Feroze",
  "Mingora", "Chitral", "Sialkot", "Ahmadpur East", "Mandi Baha-ud-din", "Jhelum",
  "Bhakkar", "Tank", "Abdul Hakeem", "Ahmadabad", "Akhorakhatak", "Ali Pur", "Alpuri",
  "Arif Wala", "Jhang", "Pallandri", "Khushab", "Toba Tek Singh", "Burewala", "Wadh",
  "Sakardu", "Mirpur AJK", "Panjgur", "Sangota", "Kahuta", "Rawalakot", "Bhitshah Sindh",
  "Mianwali", "Shikarpur", "Swat", "Malakand", "Muridke", "DG Khan", "Sibi", "Muree",
  "Hafizabad", "Kot Addu", "Lodhran", "Muslim Bagh", "Chiniot", "Kandhkot", "Oghi",
  "Rahim Yar Khan", "Pishin", "Nushki", "Vehari", "Jauharabad", "Bahawalnagar", "Layyah",
  "Sanghar", "Naushahro Feroze", "Lower Dir", "Nawabshah, Benazirabad", "Zhob", "Battagram",
  "Hangu", "Jalozai", "Pattoki", "Okara, Depalpur", "Khanspur", "Ghizer", "Hunza", "Mastung",
  "Jehlum Valley", "Neelum Valley", "Umerkot", "Shangla", "Dokri", "Dadu", "Badin", "Pakpattan",
  "Sheikhupura", "Ferozewala", "Wah", "Taxila Cantt", "Tandojam", "Nowshera", "Sheringle, Upper Dir",
  "Rasul", "Dera Murad Jamali", "Loralai", "Turbat", "Karak", "Nerian Sharif"
];

  return (
    <div className="two-section-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="left-header">
          <h1>TalentTrek</h1>
        </div>
        <div className="status-bar">
          <ul>
            <li className="active">1 </li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
          <div className="status-text">
            <p style={{fontWeight:'bold'}}>Personal Details</p>
            <p>Work Experience</p>
            <p>Education</p>
            <p>Skills</p>
            <p>Summary</p>
            <p>Final</p>
          </div>
        </div>
        <div className="resufooter">
          <p>&copy; 2023 TalentTrek</p>
          <p>talenttrek58@gmail.com</p>
        </div>
      </div>

      {/* Right Section - Personal Details */}
      <div className="right-section">
        <div className="right-header">
          <h2>Personal Details</h2>
          <p>Provide your personal details!</p>
          <p style={{color:'red',fontSize:'15px'}}>Note: Information cannot be updated later.</p>
        </div>
        <form className="personal-details-form" onSubmit={handleSubmit}>


          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" required placeholder='e.g Ahmed Malik' value={fullName} onChange={(e) => setFullName(e.target.value)}/>

          <label htmlFor="fullName">Profession:</label>
          <input type="text" id="Profession" name="Profession" required placeholder='e.g Accountant' value={profession} onChange={(e) => setProfession(e.target.value)}/>

          <label htmlFor="fullName">City:</label>
          <select
                  id="City"
                  name="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)} 
                  required
                  className='city_resume'
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
          </select>
          <label htmlFor="fullName">Country:</label>
          <input type="text" id="Country" name="Country" required placeholder='e.g Pakistan' value={country} onChange={(e) => setCountry(e.target.value)}/>

          <label htmlFor="fullName">Phone Number:</label>
          <input type="text" id="PhoneNumber" name="PhoneNumber" required placeholder='e.g 0333-1234567' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
          <small className="contact-format-info">(Format: 0XXX-XXXXXXX)</small>
<br />
          <label htmlFor="fullName">Email:</label>
          <input type="email" id="Email" name="Email" required placeholder='e.g ahmedmalik12@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>


          
          <div className="form-buttons">
            <button type="button" onClick={handleBack}>Back</button>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Questionnaire