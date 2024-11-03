import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navb from './Navb';

function EditVehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]); // For filtered results
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // For search functionality
    const [serviceTypeFilter, setServiceTypeFilter] = useState(''); // For service type dropdown filter
    const [serviceTypes, setServiceTypes] = useState([]); // To hold unique service types
    const [formData, setFormData] = useState({
        vehicleType: '',
        company: '',
        name: '',
        color: '',
        number: '',
        serviceDate: '',
        serviceType: '',
        serviceCost: ''
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        const results = vehicles.filter(vehicle =>
            (vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.number.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (serviceTypeFilter === '' || vehicle.serviceType === serviceTypeFilter)
        );
        setFilteredVehicles(results);
    }, [searchTerm, serviceTypeFilter, vehicles]);

    const fetchVehicles = async () => {
        const response = await axios.get('http://localhost:8080/vehicles');
        setVehicles(response.data);
        setFilteredVehicles(response.data);

        // Extract unique service types for the dropdown
        const types = [...new Set(response.data.map(vehicle => vehicle.serviceType))];
        setServiceTypes(types);
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setFormData(vehicle);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/vehicles/${id}`);
            fetchVehicles();
            alert('Deleted successfully');
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/vehicles/${editingVehicle._id}`, formData);
        fetchVehicles();
        setEditingVehicle(null);
        alert('Updated successfully');
    };

    const styles = {
        container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
        table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
        th: { borderBottom: '2px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2', textAlign: 'left' },
        td: { padding: '10px', borderBottom: '1px solid #ddd' },
        button: { backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer', borderRadius: '5px' },
        editButton: { backgroundColor: '#ff9800', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer', borderRadius: '5px' },
        deleteButton: { backgroundColor: '#f44336', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer', borderRadius: '5px' },
        searchInput: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ddd' },
        dropdown: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ddd' },
        formContainer: { marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' },
        input: { width: '100%', padding: '10px', margin: '5px 0 10px 0', borderRadius: '4px', border: '1px solid #ddd' },
        formButton: { backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px', width: '100%' }
    };

    return (
        <div>
            <Navb/>

        <div style={styles.container}>
            <h1>Vehicle List</h1>
            <input
                type="text"
                placeholder="Search by Name or Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
            />
            <select
                style={styles.dropdown}
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
            >
                <option value="">All Service Types</option>
                {serviceTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Type</th>
                        <th style={styles.th}>Company</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Color</th>
                        <th style={styles.th}>Number</th>
                        <th style={styles.th}>Service Date</th>
                        <th style={styles.th}>Service Type</th>
                        <th style={styles.th}>Cost</th>
                        <th style={styles.th}>Edit</th>
                        <th style={styles.th}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicles.map((vehicle) => (
                        <tr key={vehicle._id}>
                            <td style={styles.td}>{vehicle.vehicleType}</td>
                            <td style={styles.td}>{vehicle.company}</td>
                            <td style={styles.td}>{vehicle.name}</td>
                            <td style={styles.td}>{vehicle.color}</td>
                            <td style={styles.td}>{vehicle.number}</td>
                            <td style={styles.td}>{new Date(vehicle.serviceDate).toLocaleDateString()}</td>
                            <td style={styles.td}>{vehicle.serviceType}</td>
                            <td style={styles.td}>{vehicle.serviceCost}</td>
                            <td style={styles.td}>
                                <button style={styles.editButton} onClick={() => handleEdit(vehicle)}>Edit</button>
                            </td>
                            <td style={styles.td}>
                                <button style={styles.deleteButton} onClick={() => handleDelete(vehicle._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingVehicle && (
                <form onSubmit={handleUpdate} style={styles.formContainer}>
                    <h2>Edit Vehicle</h2>
                    <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} style={styles.input} placeholder="Vehicle Type" />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} style={styles.input} placeholder="Company" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} placeholder="Name" />
                    <input type="text" name="color" value={formData.color} onChange={handleChange} style={styles.input} placeholder="Color" />
                    <input type="text" name="number" value={formData.number} onChange={handleChange} style={styles.input} placeholder="Number" />
                    <input type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} style={styles.input} />
                    <input type="text" name="serviceType" value={formData.serviceType} onChange={handleChange} style={styles.input} placeholder="Service Type" />
                    <input type="number" name="serviceCost" value={formData.serviceCost} onChange={handleChange} style={styles.input} placeholder="Service Cost" />
                    <button type="submit" style={styles.formButton}>Save</button>
                </form>
            )}
        </div>
        </div>
    );
}

export default EditVehicle;
