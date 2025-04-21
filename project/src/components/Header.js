import React from 'react';

const Header = ({ isAdmin, onAddVehicle, onToggleAdmin }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AutoMarket</h1>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onAddVehicle}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Registrar Vehículo
          </button>
          
          {isAdmin && (
            <button
              onClick={onToggleAdmin}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Panel Admin
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;