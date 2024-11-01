import React, { createContext, useState } from 'react';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  const addVehicle = (newVehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  const deleteVehicle = (number) => {
    setVehicles((prevVehicles) => prevVehicles.filter(vehicle => vehicle.number !== number));
  };

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle, deleteVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};
