import React ,{useState,useEffect} from 'react'
import "./Login.css"
import {CounselorLogin} from '../../assets/index-assets'
import { Link } from 'react-router-dom';


const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(email, password);
        
        fetch("http://localhost:3002/login-counselor", {
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
            console.log(data, "counselorRegister");
            if (data.status === "ok") {
            //   alert("Login successful");
              window.localStorage.setItem("Counselortoken", data.data);
              window.localStorage.setItem("CounselorloggedIn", true);
              window.location.href = "./CounselorHome"
            }
          });
      };
    return(
        <div className='Counselor_Login'>
            <div className='Counselor_Login_Container'>

                <div className='Counselor_login_left-section'>
                    <img src={CounselorLogin} className='Counselor_imageGrad' alt='Graduation' />
                </div>

                <div className='Counselor_login_right-section'>
                    <div className='Counselor_login-form'>
                        <h1>LOGIN</h1><br /><br />
                        <form onSubmit={handleSubmit} className='Counselor_login_form'>

                            <label htmlFor='email' className='Counselor_left'>
                                <i className='fas fa-user'>Email</i>
                            </label>

                            <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='email'
                            onChange={(e) => setEmail(e.target.value)}
                            />
<br />
                            <label htmlFor='password'  className='Counselor_left'>
                                <i className='fas fa-lock'>Password</i>
                            </label>

                            <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            onChange={(e) => setPass(e.target.value)}
                            />
                            <br /><br />
                            <div className='Counselor_form-bottom'>
                                <button type='submit' className='Counselor_loginButton'>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Login