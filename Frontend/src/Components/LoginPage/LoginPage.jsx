import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Graduation } from '../../assets/index-assets';
import "./Login.css"

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  //const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
    
    fetch("http://localhost:3002/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          //alert("Login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
         // navigate('/main2');
          window.location.href = "./main2"
        }
      });
  };

  const handleFP = (e) => {
    e.preventDefault();
    window.location.href = "./forgetpassword"
  };

  const handleSignup = (e) => {
    e.preventDefault();
    window.location.href = "./signup"
  };

  return (
    <div className='main_container'>

      <div className='login_container'>
          <div className='login_left-section'>
            <img src={Graduation} className='imageGrad' alt='Graduation' />
          </div>

          <div className='login_right-section'>
            <div className='_login-form'>
              <h1>LOGIN</h1>
              <form onSubmit={handleSubmit} className='login_form'>
                <label htmlFor='email' className='left'>
                  <i className='fas fa-user'>Email</i>
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='email'
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor='password'  className='left'>
                  <i className='fas fa-lock'>Password</i>
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  onChange={(e) => setPass(e.target.value)}
                />
                <button href='#' className='forgot-password' onClick={handleFP}>
                  Forgot Password?
                </button>
                <div className='form-bottom'>
                  <button type='submit' className='loginButton'>
                    Login
                  </button>
                  <div className='signup-text'>
                    <p>
                      Don't have an account? <button onClick={handleSignup} style={{color:'blue',backgroundColor:"white"}}> Sign up here</button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};

export default LoginPage;
