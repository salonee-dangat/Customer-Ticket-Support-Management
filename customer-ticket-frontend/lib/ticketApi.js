import axios from "axios";

// Base URL of your backend
const BASE_URL = "http://localhost:5050/api";
// backend is running on port 5050

// Get all tickets
export const getTickets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tickets`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
};

// Create a new ticket
export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${BASE_URL}/tickets`, ticketData);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
  }
};
// Get analytics
export const getTicketAnalytics = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await axios.get(`${BASE_URL}/tickets/analytics?${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {};
  }
};
