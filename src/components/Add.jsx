import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [formData, setFormData] = useState({
    vehicleType: 'car',
    company: '',
    name: '',
    color: '',
    number: '',
    serviceDate: '',
    serviceType: '',
    serviceCost: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8080/addVehicle', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Display success alert
      alert('Vehicle added successfully!');
      // Reset the form after submission
      setFormData({
        vehicleType: 'car',
        company: '',
        name: '',
        color: '',
        number: '',
        serviceDate: '',
        serviceType: '',
        serviceCost: '',
        image: null,
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div>
      <div className="add-container">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="col col-12 col-sm-8 col-md-6 col-lg-4">
                <div className="row g-3">
                  {/* Vehicle Type Selection */}
                  <div className="col col-12">
                    <label htmlFor="vehicleType" className="label form-label">Select Vehicle Type</label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      className="form-control"
                      value={formData.vehicleType}
                      onChange={handleChange}
                    >
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                    </select>
                  </div>

                  <div className="col col-12">
                    <label htmlFor="company" className="label form-label">Company</label>
                    <input
                      type="text"
                      className="input form-control"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Vehicle Name */}
                  <div className="col col-12">
                    <label htmlFor="name" className="label form-label">Vehicle Name</label>
                    <input
                      type="text"
                      className="input form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Color */}
                  <div className="col col-12">
                    <label htmlFor="color" className="label form-label">Color</label>
                    <input
                      type="text"
                      className="input form-control"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Vehicle Number */}
                  <div className="col col-12">
                    <label htmlFor="number" className="label form-label">Vehicle Number</label>
                    <input
                      type="text"
                      className="input form-control"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Service Date */}
                  <div className="col col-12">
                    <label htmlFor="serviceDate" className="label form-label">Service Date</label>
                    <input
                      type="date"
                      className="input form-control"
                      name="serviceDate"
                      value={formData.serviceDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Service Type Selection */}
                  <div className="col col-12">
                    <label htmlFor="serviceType" className="label form-label">Service Type</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      className="form-control"
                      value={formData.serviceType}
                      onChange={handleChange}
                    >
                      <option value="">Select Service</option>
                      <option value="oilChange">Oil Change</option>
                      <option value="tireCheck">Tire Check</option>
                      <option value="brakeCheck">Brake Check</option>
                      <option value="chainLubrication">Chain Lubrication</option>
                      <option value="batteryCheck">Battery Check</option>
                    </select>
                  </div>

                  {/* Service Cost */}
                  <div className="col col-12">
                    <label htmlFor="serviceCost" className="label form-label">Service Cost</label>
                    <input
                      type="number"
                      className="input form-control"
                      name="serviceCost"
                      value={formData.serviceCost}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Upload Vehicle Image */}
                  <div className="col col-12">
                    <label htmlFor="image" className="label form-label">Upload Vehicle Image</label>
                    <input
                      type="file"
                      className="input form-control"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="col col-12">
                    <button type="submit" className="btn btn-danger w-100">SUBMIT</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
