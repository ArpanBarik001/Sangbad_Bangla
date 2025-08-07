import React, { useState } from 'react';

const EditorPage = () => {
  const [category, setCategory] = useState('general');
  const [newsLink, setNewsLink] = useState('');
  const [message, setMessage] = useState('');

  const categories = [
    'general',
    'technology',
    'sports',
    'health',
    'lifestyle',
    'business',
    'world',
    'popular',
    'opinion',
    'entertainment',
    'cricket'
  ];
const handleSubmit = (e) => {
  e.preventDefault();

  if (!newsLink.trim()) {
    setMessage('⚠️ Please enter a valid news link.');
    return;
  }

  const existing = JSON.parse(localStorage.getItem('editorialLinks')) || [];

  // Prepare data
  // const newLink = {
  //   url: newsLink,
  //   category: category,
  //   timestamp: new Date().toISOString()
  // };

  const newLink = {
  url: newsLink,
  category: category,
  };


  // Get existing links from localStorage

  // Add new link
  const updatedLinks = [...existing, newLink];
  localStorage.setItem('editorialLinks', JSON.stringify(updatedLinks));

  // Reset form
  setNewsLink('');
  setCategory("");
  setMessage(`✅ News link submitted under "${category}" category.`);
};

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!newsLink.trim()) {
//       setMessage('⚠️ Please enter a valid news link.');
//       return;
//     }

//     // Simulate submit
//     console.log('Submitted:', { category, newsLink });

//     // Reset form and show success message
//     setNewsLink('');
//     setMessage(`✅ News link submitted under "${category}" category.`);
//   };

  return (
    <div
      style={{
        backgroundColor: '#223243',
        color: '#ffffff',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: 'auto',
          background: '#2e3d4f',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 0 12px rgba(0,0,0,0.4)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>
          📝 Editor Submission Panel
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '8px' }}>
              Select Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#f1f1f1',
                color: '#000',
              }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="link" style={{ display: 'block', marginBottom: '8px' }}>
              News Link
            </label>
            <input
              id="link"
              type="url"
              placeholder="https://example.com/article"
              value={newsLink}
              onChange={(e) => setNewsLink(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#f1f1f1',
                color: '#000',
              }}
              required
            />
          </div>

          {message && (
            <div
              style={{
                marginBottom: '15px',
                backgroundColor: '#1e90ff',
                padding: '10px',
                borderRadius: '6px',
                color: '#fff',
              }}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Submit News Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditorPage;
