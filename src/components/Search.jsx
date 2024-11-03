import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navb from './Navb';


const Search = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchNumber, setSearchNumber] = useState('');
  const [foundVehicle, setFoundVehicle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all vehicles when the component mounts
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getVehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles", error);
        setError("Failed to fetch vehicles.");
      }
    };

    fetchVehicles();
  }, []);

  const handleSearch = () => {
    const vehicle = vehicles.find(v => v.number === searchNumber);
    if (vehicle) {
      setFoundVehicle(vehicle);
      setError(''); // Clear error if found
    } else {
      setFoundVehicle(null);
      setError(`No vehicle found with number: ${searchNumber}`);
    }
  };

  return (
    <div>
    <Navb/>
    <div className="search-container">
      <br />
      <center><h2>Search Vehicle</h2></center>
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter Vehicle Number"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          className="form-control"
        />
        <br />
        <br />
        <center>
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </center>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {foundVehicle && (
        <div className="vehicle-details">
          <br />
          <h3>Vehicle Details</h3>
          <br />
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td><strong>Type:</strong></td>
                <td>{foundVehicle.vehicleType}</td>
              </tr>
              <tr>
                <td><strong>Company:</strong></td>
                <td>{foundVehicle.company}</td>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{foundVehicle.name}</td>
              </tr>
              <tr>
                <td><strong>Color:</strong></td>
                <td>{foundVehicle.color}</td>
              </tr>
              <tr>
                <td><strong>Number:</strong></td>
                <td>{foundVehicle.number}</td>
              </tr>
              <tr>
                <td><strong>Service Date:</strong></td>
                <td>{new Date(foundVehicle.serviceDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Service Type:</strong></td>
                <td>{foundVehicle.serviceType}</td>
              </tr>
              <tr>
                <td><strong>Service Cost:</strong></td>
                <td>{foundVehicle.serviceCost}</td>
              </tr>
              <tr>
                <td><strong>Image:</strong></td>
                <td>
                  {foundVehicle.image && (
                    <img src={`http://localhost:8080/uploads/${foundVehicle.image}`} alt="Vehicle" style={{ width: '100px' }} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default Search;
