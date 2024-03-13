/* eslint-disable class-methods-use-this */
class AuthService {
  
  async login(username, password) {
    const {VITE_BACKEND_API_URL} = import.meta.env;
    const res = await fetch(`${VITE_BACKEND_API_URL}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      throw new Error('Failed to authenticate');
    }
    const data = await res.json();
    // Mock token handling (replace with your actual token handling logic)
    // sessionStorage.setItem("user", JSON.stringify(data));
    const {token, name, email, role, member_id} = data;
    sessionStorage.setItem('token', token); // Store token in localStorage
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('id', member_id);
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