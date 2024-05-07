import React from 'react';
import "./styles.css"

const Navbar=()=>{
    return (
    <nav className="CounselorNav_nav">
        <a href="/" className="CounselorNav_site-title">Talent<span className="CounselorNav_trek">Trek</span></a>
        <ul>
            <li >
                <a href="/"> Messages</a>
            </li>
            <li>
                <a href="/"> Schedule</a>
            </li>
            <li>
                <a href="/"> Profile</a>
            </li>
        </ul>
    </nav>
    )
}
export default Navbar