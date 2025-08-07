import { Link } from "react-router-dom";
import React from 'react'
import './css/Navbar.css';

export default function Navbar() {
  return (
      <nav className="ht-navbar">
        <div className="ht-heading">
          <h2 className="logo-text">
            <span className="sangbad">Sangbad</span>
            <br />
            <span className="bangla">বাংলা</span>
          </h2>
          <div className="ht-sign">
            <Link to="/register" className="user-btn"><i className="fa-solid fa-user"></i></Link>
            <p className="sign">Sign In</p>
          </div>

        </div>
        <hr className="divider" />
        <div className="ht-container">
          {/* <div className="ht-logo">
      <Link to="/">হিন্দুস্তান টাইমস</Link>
    </div> */}
          <ul className="ht-nav-links">
            <li><Link to="/">প্রথম পাতা</Link></li>
            <li><Link to="/popular">জনপ্রিয়</Link></li>
            <li><Link to="/cricket">ক্রিকেট</Link></li>
            {/* <li><Link to="/face">বাংলার মুখ</Link></li>
            <li><Link to="/bioscope">বায়োস্কোপ</Link></li>
            <li><Link to="/webstory">ওয়েবস্টোরি</Link></li>
            <li><Link to="/littlethings">টুকিটাকি</Link></li>
            <li><Link to="/gallery">ছবিঘর</Link></li> */}
            <li><Link to="/kolkata">কলকাতা</Link></li>
            <li><Link to="/sport">খেলা</Link></li>
            <li><Link to="/entertainment">স্বাস্থ্য</Link></li>
            <li><Link to="/lifestyle">জীবনযাপন</Link></li>
            <li><Link to="/technology">প্রযুক্তি</Link></li>
            <li><Link to="/business">ব্যবসা</Link></li>
            <li><Link to="/world">বিশ্ব</Link></li>
            <li><Link to="/opinion">মতামত</Link></li>
          </ul>
        </div>
      </nav>

  )
}


