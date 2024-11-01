import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Viewall = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getVehicles'); // Update this with your endpoint
        setVehicles(response.data);
      } catch (error) {
        console.error("There was an error fetching the vehicles!", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Vehicle List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Company</th>
            <th>Name</th>
            <th>Color</th>
            <th>Number</th>
            <th>Service Date</th>
            <th>Service Type</th>
            <th>Service Cost</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <tr key={vehicle.id}> {/* Assuming 'id' is a unique identifier */}
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.company}</td>
                <td>{vehicle.name}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.number}</td>
                <td>{new Date(vehicle.serviceDate).toLocaleDateString()}</td>
                <td>{vehicle.serviceType}</td>
                <td>{vehicle.serviceCost}</td>
                <td>
                  {vehicle.image && (
                    <img
                      src={`http://localhost:8080/uploads/${vehicle.image}`} // Update with your image path
                      alt={vehicle.name}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No vehicles found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Viewall;
