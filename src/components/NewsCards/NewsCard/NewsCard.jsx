import React from 'react';
import './NewsCard.css';

const NewsCard = ({ article }) => (
  <div className="news-card">
    {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
    <h2>{article.title}</h2>
    <p>{article.description || 'No description available.'}</p>
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      Read More
    </a>
  </div>
);

export default NewsCard;
