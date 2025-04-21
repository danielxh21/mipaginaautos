import React, { useEffect, useState } from 'react';
import VehicleCard from './VehicleCard';
import { 
  getVehicles, 
  approveVehicle, 
  rejectVehicle, 
  deactivateVehicle 
} from '../services/vehicleService';

const AdminPanel = () => {
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

  const handleApprove = async (id) => {
    try {
      await approveVehicle(id);
      setVehicles(prev => 
        prev.map(v => v.id === id ? { ...v, pending: false, status: 'approved' } : v)
      );
    } catch (error) {
      console.error("Error approving vehicle:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectVehicle(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (error) {
      console.error("Error rejecting vehicle:", error);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await deactivateVehicle(id);
      setVehicles(prev => 
        prev.map(v => v.id === id ? { ...v, status: 'inactive' } : v)
      );
    } catch (error) {
      console.error("Error deactivating vehicle:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando vehículos...</div>;
  }

  const pendingVehicles = vehicles.filter(v => v.pending);
  const approvedVehicles = vehicles.filter(v => !v.pending && v.status === 'approved');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Vehículos Pendientes</h2>
        {pendingVehicles.length === 0 ? (
          <p className="text-gray-500">No hay vehículos pendientes</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingVehicles.map(vehicle => (
              <VehicleCard 
                key={vehicle.id}
                vehicle={vehicle}
                isAdmin={true}
                onApprove={() => handleApprove(vehicle.id)}
                onReject={() => handleReject(vehicle.id)}
                onDeactivate={() => handleDeactivate(vehicle.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Vehículos Aprobados</h2>
        {approvedVehicles.length === 0 ? (
          <p className="text-gray-500">No hay vehículos aprobados</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedVehicles.map(vehicle => (
              <VehicleCard 
                key={vehicle.id}
                vehicle={vehicle}
                isAdmin={true}
                onApprove={() => handleApprove(vehicle.id)}
                onReject={() => handleReject(vehicle.id)}
                onDeactivate={() => handleDeactivate(vehicle.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;