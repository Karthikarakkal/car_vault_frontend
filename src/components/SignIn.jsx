import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../App.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage('Please fill in both fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/adminSignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin_name: username, admin_password: password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Successful login
      localStorage.setItem('token', data.token); // Store token if returned
      setMessage('Login successful!');
      navigate('/Main'); // Redirect to Main page

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="username" className="label form-label">Username</label>
                <input
                  type="text"
                  className="input form-control"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="password" className="label form-label">Password</label>
                <input
                  type="password"
                  className="input form-control"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12">
                <button className="btn btn-success w-100" onClick={handleLogin} disabled={loading}>
                  {loading ? 'Loading...' : 'Login'}
                </button>
              </div>
              {message && <div className="col-12 text-center">{message}</div>}
              <div className="col-12 text-center mt-3">
                <p>
                  Not registered? <Link to="/signup">Sign up here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
