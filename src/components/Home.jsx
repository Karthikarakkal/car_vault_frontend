import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* Header with Decorative Title */}
            <div className="alert alert-secondary" role="alert">
                <center>
                    <h1 className="decorative-heading">Vehicle Service Website</h1>
                </center>
            </div>

            

            {/* Main Background Section with Background Image */}
            <div
                style={{
                    height: '600px',
                    backgroundImage: 'url("https://images.pexels.com/photos/13065692/pexels-photo-13065692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
               

                {/* Centered Content with Buttons */}
                <div className="d-grid gap-3 col-6 mx-auto text-center">
                    <Link className="btn btn-primary btn-lg shadow-lg" to="/SignIn">
                        <h2>MECHANIC LOGIN(ADMIN)</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
