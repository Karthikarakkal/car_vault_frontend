// VehicleList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit from './Edit';

const VehicleList = ({ userId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getVehicles');
        setVehicles(response.data);
      } catch (err) {
        console.error("Error fetching vehicles", err);
        setError("Failed to fetch vehicles.");
      }
    };
    fetchVehicles();
  }, []);

  const handleEditClick = (id) => {
    setEditingVehicleId(id);
  };

  const handleCancelEdit = () => {
    setEditingVehicleId(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getVehicles');
      setVehicles(response.data);
      setEditingVehicleId(null);
    } catch (err) {
      console.error("Error fetching updated vehicles", err);
      setError("Failed to update vehicles.");
    }
  };

  return (
    <div>
      <h2>Vehicle List</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table">
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
            <th>Image Path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.company}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.number}</td>
              <td>{new Date(vehicle.serviceDate).toLocaleDateString()}</td>
              <td>{vehicle.serviceType}</td>
              <td>{vehicle.serviceCost}</td>
              <td>{vehicle.imagePath}</td>
              <td>
                {vehicle.userId === userId && (
                  <button onClick={() => handleEditClick(vehicle._id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingVehicleId && (
        <Edit
          vehicleId={editingVehicleId}
          onCancel={handleCancelEdit}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default VehicleList;
