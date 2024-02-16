/* eslint-disable class-methods-use-this */
class AuthService {
  async login(username, password) {
    return fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to authenticate');
      }
      return res.json();
    })
    .then(data => {
      // Mock token handling (replace with your actual token handling logic)
      const token = data.token;
      localStorage.setItem('token', token); // Store token in localStorage
      return data;
    });
  }

  logout() {
    localStorage.removeItem('token'); // Remove token from localStorage
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
  }
}

export default new AuthService();
