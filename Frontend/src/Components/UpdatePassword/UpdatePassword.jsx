
import React ,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './UpdatePassword.css'; 
import { useLocation } from 'react-router-dom';


function App () {
  const location=useLocation();

  const [name,setName] = useState("");
  const [age,setAge] = useState("");
  const [password,setPassword] = useState("");
  const [dateOfBirth,setDob] = useState("");
  const [contact,setContact] = useState("");
  const [city,setCity] = useState("");

  useEffect (()=>{
    console.log(location);
    setName(location.state.name);
    setAge(location.state.age);
    setPassword(location.state.password);
    setDob(location.state.dateOfBirth);
    setContact(location.state.contact);
    setCity(location.state.city);
  },[])

  const updateData = ()=> {
    console.log(name, age,password,contact,city);
    fetch("http://localhost:3002/updateUser",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        id: location.state._id,
        name:name,
        password: password,
        age: age,
        dateOfBirth: dateOfBirth,
        contact: contact,
        city : city,
      }),
    })
    .then((res)=>res.json())
    .then((data=>{
      console.log(data);
      window.location.href = "./userprofile"
    }));
  }

  return (
    <div className="up-app-container">
      <div className="up-right-section">
        <h1 className='up-profile'>Update Profile</h1>
        <div className="up-blur-container">
            
              
              
              <div className='upass-div'>
                    <label className='upass-label'>Name</label>
                    <input
                    className='upass-input'
                        type="name"
                        id="name"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                   />
                </div>
                <div className='upass-div'>
                    <label className='upass-label'>Age</label>
                    <input
                    className='upass-input'
                        type="name"
                        id="name"
                        defaultValue={age}
                        onChange={(e) => setAge(e.target.value)}
                   />
                </div>
                <div className='upass-div'>
                    <label className='upass-label'>Password:</label>
                    <input
                    className='upass-input'
                        type="password"
                        id="password"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='upass-div'>
                    <label className='upass-label'>Date of Birth:</label>
                    <input
                    className='upass-input'
                        type="date"
                        id="dob"
                        defaultValue={dateOfBirth}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>
                <div className='upass-div'>
                    <label className='upass-label'>Contact:</label>
                    <input
                    className='upass-input'
                        type="contact"
                        id="contact"
                        defaultValue={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <div className='upass-div'>
                    <label className='upass-label'>City:</label>
                    <input
                    className='upass-input'
                        type="city"
                        id="city"
                        defaultValue={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button type="submit" className='upass-button' onClick={updateData}>Update Data</button>
             
            </div>
         </div>
      
    </div>
  );
};

export default App;
