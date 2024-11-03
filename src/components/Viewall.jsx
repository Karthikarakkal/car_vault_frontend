import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import Navb from './Navb';

const Viewall = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getVehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error("There was an error fetching the vehicles!", error);
      }
    };

    fetchVehicles();
  }, []);

  const generatePDF = (vehicle) => {
    const doc = new jsPDF();

    // Set custom fonts, colors, and layout
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102);
    doc.text("Service Billing Form", 70, 20);

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Vehicle details section with custom font styling
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text(`Billing Date: ${new Date().toLocaleDateString()}`, 20, 35);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text("Vehicle Details", 20, 50);
    
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Vehicle Number: ${vehicle.number}`, 20, 60);
    doc.text(`Vehicle Name: ${vehicle.name}`, 20, 70);
    doc.text(`Vehicle Type: ${vehicle.vehicleType}`, 20, 80);
    doc.text(`Vehicle Color: ${vehicle.color}`, 20, 90);

    // Service details section with styling
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text("Service Details", 20, 110);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Service Date: ${new Date(vehicle.serviceDate).toLocaleDateString()}`, 20, 120);
    doc.text(`Service Type: ${vehicle.serviceType}`, 20, 130);
    doc.text(`Service Cost: $${vehicle.serviceCost.toFixed(2)}`, 20, 140);

    // Add footer section
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for choosing our service!", 20, 160);
    doc.text("For any inquiries, please contact us at support@example.com", 20, 170);

    // Save the generated PDF
    doc.save(`Billing_Form_${vehicle.number}.pdf`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navb/>
      
      <div className="container mt-4">
        <h2 className="text-center">Vehicle List</h2>
        <div className="mb-3">
          <input 
            type="text" 
            placeholder="Search by name, number, or company" 
            value={searchQuery} 
            onChange={handleSearch} 
            className="form-control"
          />
        </div>
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
              <th>Billing PDF</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
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
                        src={`http://localhost:8080/uploads/${vehicle.image}`}
                        alt={vehicle.name}
                        style={{ width: '100px', height: 'auto' }}
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => generatePDF(vehicle)} className="btn btn-primary">
                      Generate PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">No vehicles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewall;
