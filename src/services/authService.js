/* eslint-disable class-methods-use-this */
class AuthService {
  async login(username, password) {
    const res = await fetch('https://work-app-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      throw new Error('Failed to authenticate');
    }
    const data = await res.json();
    // Mock token handling (replace with your actual token handling logic)
    const {token, name, email, role} = data;
    sessionStorage.setItem('token', token); // Store token in localStorage
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('role', role);
    return data;
  }

  logout() {
    sessionStorage.removeItem('token'); // Remove token from localStorage
  }

  isAuthenticated() {
    const token = sessionStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
  }
}

export default new AuthService();
