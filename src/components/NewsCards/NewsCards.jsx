import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard/NewsCard';
import { fetchNews } from '../../api';
import './NewsCards.css';
import Loader from '../Loader/Loader'; // Loader for spinner animation

const NewsCards = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const newArticles = await fetchNews(page);
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setLoading(false);
    };

    loadNews();
  }, [page]);

  const loadMoreNews = () => setPage((prevPage) => prevPage + 1);

  return (
    <div className="news-cards">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
      {loading ? (
        <Loader />
      ) : (
        <button className="load-more" onClick={loadMoreNews}>
          Load More
        </button>
      )}
    </div>
  );
};

export default NewsCards;
