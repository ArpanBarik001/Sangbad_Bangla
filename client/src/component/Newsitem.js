import React from 'react';

const Newsitem = ({ title, description, imageUrl, newsUrl, author, time, name }) => {
  return (
    <div>
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {title}... <span className="badge text-bg-danger">{name}</span>
          </h5>
          <p className="card-text">{description}...</p>
          <p className="fs-6">BY {author ? author : "Unknown"}</p>
          <p className="card-text">
            <small className="text-body-secondary">At {time}</small>
          </p>
          <a href={newsUrl} className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
