import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            {/* Header with Decorative Title */}
            <div className="alert alert-secondary" role="alert">
                <center>
                    <h1 className="decorative-heading">Mechanic Shop</h1>
                </center>
            </div>
                 {/* Main Background Section */}
            <div
                style={{
                    height: '600px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {/* Overlay for Better Text Visibility */}
                <div className="overlay"></div>

                {/* Centered Content with Buttons */}
                <div className="d-grid gap-3 col-6 mx-auto text-center">
                    <Link className="btn btn-primary btn-lg shadow-lg" to="/SignIn">
                        <h2>ADMIN LOGIN</h2>
                    </Link>
                </div>
            </div>

            {/* Footer with Background Image */}
            <div
                style={{
                    height: '150px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    marginTop: '-10px'
                }}
            ></div>
        </div>
    );
};

export default Home;