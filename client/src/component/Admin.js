// src/pages/Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    editors: 0,
    reporters: 0,
    visitors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/stats');
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err.response?.data || err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard" style={{ padding: '20px' }}>
      <h2>Admin Overview</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Editors" value={stats.editors} />
        <StatCard title="Reporters" value={stats.reporters} />
        <StatCard title="Visitors" value={stats.visitors} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{
      flex: '1',
      minWidth: '200px',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      textAlign: 'center',
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}

