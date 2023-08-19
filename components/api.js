
// api.js

// Fetch tickets from the API
export const fetchTickets = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      return data.tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
  };
  
  // Fetch users from the API
  export const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  