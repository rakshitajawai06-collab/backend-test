import React, { useState } from 'react';
import './App.css';
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // Simulate API call
      const response = await new Promise(resolve => setTimeout(() => {
        if (email === 'user@example.com' && password === 'password123') {
          resolve({ success: true, message: 'Login successful!' });
        } else {
          resolve({ success: false, message: 'Invalid credentials.' });
        }
      }, 1000));

      if (response.success) {
        alert(response.message); // Or redirect
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;