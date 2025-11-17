import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    console.log(error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("An unexpected error occurred. Please try again later.");
  }
);

/**
 * Trigger scraping of all target pages
 * @returns {Promise<Object>} Scrape results
 */
export const scrapePagesAPI = async () => {
  const response = await api.post("/api/scrape");
  return response.data;
};

/**
 * Send a chat message and get AI response
 * @param {string} question - The user's question
 * @returns {Promise<Object>} Chat response with answer and sources
 */
export const chatAPI = async (question) => {
  const response = await api.post("/api/chat", { question });
  return response.data;
};

/**
 * Get chat history
 * @returns {Promise<Object>} Chat history
 */
export const getChatHistoryAPI = async () => {
  const response = await api.get("/api/history");
  return response.data;
};

export default api;
