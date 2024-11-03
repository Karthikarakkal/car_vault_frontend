import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navb = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage when logging out
    localStorage.removeItem('authToken');
    
    // Navigate to the Home page after logout
    navigate('/'); // Redirect to Home page
  };

  return (
    <div>
      <div className="alert alert-primary" role="alert">
        <center><b><h3>ADMIN DASHBOARD</h3></b></center>
      </div>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Add">Add Vehicle Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Search">Search Vehicle Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/editvehicle">Edit Vehicle Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Viewall">View All Vehicle Details</Link>
              </li>
            </ul>
            {/* Logout button aligned to the right */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navb;
