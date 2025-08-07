import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Reporter.css'; // ✅ Make sure this is imported

const Reporter = () => {
  const [reporterData, setReporterData] = useState(null);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let userEmail = null;
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        userEmail = parsed?.email || null;
      }
    } catch (e) {
      console.error("Invalid user data in localStorage");
    }

    if (!userEmail) {
      console.error("User not found in localStorage.");
      return;
    }

    axios.post('http://localhost:5000/user/get-reporter', { email: userEmail })
      .then(res => {
        setReporterData(res.data);
        setAddress(res.data.address || '');
      })
      .catch(err => console.error(err));
  }, []);

  const updateAddress = () => {
    const userData = localStorage.getItem('user');
    const userEmail = userData ? JSON.parse(userData).email : null;

    if (!userEmail) {
      setMessage('User email not found in localStorage');
      return;
    }

    axios.post('http://localhost:5000/user/update-address', {
      email: userEmail,
      address
    })
    .then(res => {
      setMessage('Address updated!');
    })
    .catch(err => {
      setMessage('Error updating address.');
    });
  };

  if (!reporterData) return <p className="loading">Loading...</p>;

  return (
    <div className="reporter-container">
      <h2 className="dashboard-title">📰 Reporter Dashboard</h2>
      <img
        src={localStorage.getItem('userAvatar')}
        alt="Reporter Avatar"
        className="avatar"
      />
      <div className="info-group">
        <p><strong>Name:</strong> {reporterData.name}</p>
        <p><strong>Email:</strong> {reporterData.email}</p>
        <p><strong>Reporter ID:</strong> {reporterData.reporterId}</p>
        <p><strong>First Active:</strong> {new Date(reporterData.firstActive).toLocaleString()}</p>
        <p><strong>Last Active:</strong> {new Date(reporterData.lastActive).toLocaleString()}</p>
      </div>

      <div className="address-group">
        <label htmlFor="address"><strong>Address:</strong></label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address-input"
          placeholder="Enter address"
        />
        <button className="update-btn" onClick={updateAddress}>Update Address</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Reporter;

