import React, { Component, useState } from 'react';
import { Graduation } from '../../assets/index-assets'; // Import your image
import "./SignUpPage.css";
class SignupForm extends Component {
 
  
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      cPass: "",
      age: "",
      dateOfBirth: "",
      contact: "",
      division: "",
      city: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  validatePassword(password) {
    // Password should be at least 8 characters and contain at least one alphabet, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  }

  validateContact(contact) {
    // Contact should be in the format 0XXX-XXXXXXX, where X is a digit
    const contactRegex = /^0\d{3}-\d{7}$/;
    return contactRegex.test(contact);
  }
  //handle division change
  handleDivisionChange = (e) => {
    this.setState({ division: e.target.value, city: "" });
  }

  // Handle city selection
  handleCityChange = (e) => {
    this.setState({ city: e.target.value });
  }


  handleSubmit(e){
    e.preventDefault();
    const {name,email,password,cPass,age,dateOfBirth,contact,city} = this.state;
    
    // Password validation
    if (!this.validatePassword(password)) {
      alert("Password should be at least 8 characters and contain alphabet, number, and one special character");
      return;
    }

    // Confirm Password validation
    if (password !== cPass) {
      alert("Password and Confirm Password should be the same");
      return;
    }

    // Contact validation
    if (!this.validateContact(contact)) {
      alert("Contact should be in the format 0XXX-XXXXXXX");
      return;
    }
    
    console.log(name,email,password,cPass,age,dateOfBirth,contact,city);

    fetch("http://localhost:3002/register",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        name,
        email,
        password,
        cPass,
        age,
        dateOfBirth,
        contact,
        city,
      }),
    })
    .then((res)=>res.json())
    .then((data=>{
      //console.log(data,"userRegister");
      if (data.status === "ok") {

        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        //alert("Signup successful");
        window.location.href = "./main2";
      }
    })

    )
  }

  render() {

    
    const divisions = [
      "Islamabad Capital Territory",
      "Punjab",
      "Sindh",
      "Khyber Pakhtunkhwa (KPK)",
      "Balochistan",
      "Azad Jammu and Kashmir (AJK)",
      "Gilgit-Baltistan",
    ];

    const citiesByDivision = {
      "Punjab": [
        "Lahore", "Multan", "Rawalpindi", "Faisalabad", "Okara", "Sialkot", "Sahiwal", "Bahawal Pur",
        "D.G. Khan", "Layyah", "Rahim Yar Khan", "Jhang", "Chiniot", "Lodhran", "Pakpattan", "Sheikhupura",
        "Taxila", "Toba Tek Singh", "Vehari", "Attock", "Bhakkar", "Khushab", "Narowal", "Hafizabad",
        "Mianwali", "Mandi Baha-ud-din", "Jhelum", "Rajanpur", "Gujranwala", "Gujrat", "Kasur", "Khanewal",
        "Muzaffargarh", "Nankana Sahib", "Sargodha","Kharian"
      ],
      "Sindh": [
        "Karachi", "Hyderabad", "Nawab Shah", "Sukkur", "Larkana", "Mir Pur (AJK)", "Kotri", "Jamshoro",
        "Shahdadpur", "Badin", "Thatta", "Tando Allah Yar", "Shikarpur", "Jacobabad", "Matiari", "Mirpur Khas",
        "Tando Adam", "Kashmore", "Dadu", "Ghotki", "Sanghar", "Umerkot", "Naushehro Feroze", "Khairpur",
        "Sujawal", "Tando Muhammad Khan", "Naushahro Feroze", "Mithi", "Tharparkar",
        "Tando Allahyar", "Mirpur Mathelo"
      ],
      "Khyber Pakhtunkhwa (KPK)": [
        "Abbottabad", "Mansehra", "Swabi", "Kohat", "Mardan", "Mingora", "Chitral", "Haripur", "Risalpur",
        "Dera Ismail Khan", "Nowshera", "Batkhela", "Bannu", "Hangu", "Dargai", "Daggar", "Parachinar", "Chakdara",
        "Tank", "Jamrud", "Timergara","Swat", "Karak",
        "Lakki Marwat", "Upper Dir", "Lower Dir", "Bajaur", "Buner", "Mohmand", "Shangla"
      ],
      "Balochistan": [
        "Quetta", "Gwadar", "Khuzdar", "Loralai", "Chaman", "Zhob", "Sibi", "Turbat", "Kalat", "Kharan",
        "Mastung", "Nushki", "Panjgur", "Qila Abdullah", "Qila Saifullah", "Awaran", "Barkhan", "Dera Bugti",
        "Harnai", "Jhal Magsi", "Kachhi", "Kech", "Kohlu", "Lasbela", "Lehri", "Musa Khel", "Nasirabad", "Pishin",
        "Washuk"
      ],
      "Azad Jammu and Kashmir (AJK)": [
        "Muzaffarabad", "Mirpur", "Bhimber", "Kotli", "Rawalakot", "Bagh", "Palandri", "Haveli", "Sudhanoti"
      ],
      "Gilgit-Baltistan": [
        "Gilgit", "Skardu", "Chilas", "Astore", "Ghanche", "Kharmang", "Shigar", "Nagar", "Diamer", "Ghizer",
        "Hunza", "Gupis"
      ],
      "Islamabad Capital Territory": [
        "Islamabad"
      ]
    };

    return (
      <div className='smain_container'>
        <div className="signup-container">
          <div className="image-section">
            <img src={Graduation} alt="Graduation" className="imageGrad" />
          </div>
          <div className='sright-section'>
            <div className="Signup-form-section">
              <h1> SignUp Form </h1>
              <form onSubmit={this.handleSubmit} className='sform'>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" 
                onChange={(e)=>this.setState({name:e.target.value})} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" 
                onChange={(e)=>this.setState({email:e.target.value})} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" 
                onChange={(e)=>this.setState({password:e.target.value})} required />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(e)=>this.setState({cPass:e.target.value})}
                  required
                />

                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" 
                onChange={(e)=>this.setState({age:e.target.value})} required />

                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" 
                onChange={(e)=>this.setState({dateOfBirth:e.target.value})} required />

                <label htmlFor="contact">Contact:</label>
                <input type="tel" id="contact" name="contact" 
                onChange={(e)=>this.setState({contact:e.target.value})} required />
                <small style={{fontSize:"12px",color:"blue"}}>Format: 0XXX-XXXXXXX</small>
                <br />

              
                <label htmlFor="division">Division:</label>
                <select
                  id="division"
                  name="division"
                  value={this.state.division}
                  onChange={this.handleDivisionChange}
                  required
                  className='city_Signup'
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>{division}</option>
                  ))}
                </select>

                {this.state.division && (
                  <div>
                    <label htmlFor="city">City:</label>
                    <select
                      id="city"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleCityChange}
                      required
                      className='city_Signup'
                    >
                      <option value="">Select City</option>
                      {citiesByDivision[this.state.division].map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                )}



                <button type="submit" className='Sign_button'>Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
