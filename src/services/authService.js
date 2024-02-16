/* eslint-disable class-methods-use-this */
class AuthService {
  async login(username, password) {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      throw new Error('Failed to authenticate');
    }
    const data = await res.json();
    // Mock token handling (replace with your actual token handling logic)
    const {token} = data;
    localStorage.setItem('token', token); // Store token in localStorage
    return data;
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
