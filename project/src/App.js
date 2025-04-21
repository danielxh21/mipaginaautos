import React, { useState } from 'react';
import Header from './components/Header';
import VehicleForm from './components/VehicleForm';
import AdminPanel from './components/AdminPanel';
import VehicleList from './components/VehicleList';
import Notification from './components/Notification';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleAddVehicle = (newVehicle) => {
    setShowForm(false);
    setNotification({
      message: 'Vehículo registrado! Estará pendiente de aprobación.',
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    setShowAdmin(!showAdmin);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        isAdmin={isAdmin}
        onAddVehicle={() => setShowForm(true)}
        onToggleAdmin={toggleAdmin}
      />
      
      <main className="container mx-auto px-4 py-8">
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        {showForm ? (
          <div className="max-w-4xl mx-auto">
            <VehicleForm onSubmit={handleAddVehicle} />
          </div>
        ) : showAdmin ? (
          <AdminPanel />
        ) : (
          <VehicleList isAdmin={isAdmin} />
        )}
      </main>
    </div>
  );
};

export default App;

// DONE