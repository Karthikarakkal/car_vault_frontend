import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const UserSignUp = () => {
    const [data, setData] = useState({
        user_name: '',
        user_password: '',
        confirm_user_password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = async () => {
        // Basic validation
        if (!data.user_name || !data.user_password || !data.confirm_user_password) {
            alert("Please fill in all fields");
            return;
        }

        if (data.user_password !== data.confirm_user_password) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/adminSignUp", { // Adjust the endpoint as necessary
                admin_name: data.user_name,
                admin_password: data.user_password
            });

            if (response.data.Status === "Saved") {
                alert("Sign Up Successfully");
                navigate('/signin'); // Redirect to login page after successful signup
            } else {
                alert("Sign Up Failed: " + response.data.Error || "Unknown error");
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: 'url("https://images.pexels.com/photos/3807450/pexels-photo-3807450.jpeg")', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg border-rounded text-bg-light border-info">
                            <div className="card-body">
                                <h4 className="text-center mb-4">Create an Account</h4>
                                {message && <div className="alert alert-info">{message}</div>}
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="user_name"
                                            value={data.user_name}
                                            onChange={inputHandler}
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="user_password"
                                            value={data.user_password}
                                            onChange={inputHandler}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirm_user_password"
                                            value={data.confirm_user_password}
                                            onChange={inputHandler}
                                            placeholder="Re-enter your password"
                                        />
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="btn btn-success w-50" onClick={readValue}>
                                            Sign Up
                                        </button>
                                        <div className="mt-3">
                                            <Link to="/signin">Back to Login Page</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSignUp;
