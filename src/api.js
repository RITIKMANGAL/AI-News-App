import axios from 'axios';

const API_KEY = 'REACT_APP_NEWS_API_KEY'; // Replace with your NewsAPI key
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetches top headlines from the News API with pagination.
 * @param {number} page - The page number to fetch.
 * @param {number} pageSize - The number of articles per page.
 * @returns {Promise<Array>} List of articles
 */
export const fetchNews = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: 'us', // Change the country code as needed (e.g., 'in' for India)
        page,          // Specify the page number
        pageSize,      // Specify the number of articles per page
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return [];
  }
};
