import React, { useEffect, useState } from 'react';
import VehicleCard from './VehicleCard';
import { getVehicles } from '../services/vehicleService';

const VehicleList = ({ isAdmin }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando vehículos...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles
        .filter(v => !v.pending && v.status === 'approved')
        .map(vehicle => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle}
            isAdmin={isAdmin}
          />
        ))}
    </div>
  );
};

export default VehicleList;