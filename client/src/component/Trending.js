import React from 'react';
import './css/Trending.css';

const TrendingNews = ({ newsList }) => {
  const topFiveNews = newsList.slice(0, 5);

  return (
    <div className="trending-news-container">
      <h2 className="trending-title">🔥 ট্রেন্ডিং খবর</h2>
      {topFiveNews.map((news, index) => (
        <div key={index} className="news-card">
          <h4 className="news-title">{news.category}</h4>
          <p className="news-snippet">{news.url}</p>
          {index < topFiveNews.length - 1 && <hr className="divider" />}
        </div>
      ))}
    </div>
  );
};

export default TrendingNews;
