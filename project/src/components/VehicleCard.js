import React, { useState } from 'react';

const VehicleCard = ({ vehicle, isAdmin, onApprove, onReject, onDeactivate }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex(prev => 
      prev === 0 ? vehicle.photos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex(prev => 
      prev === vehicle.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleContact = () => {
    const message = `Hola, estoy interesado en el vehículo ${vehicle.name} (${vehicle.year}) que vi en AutoMarket. ¿Podrías darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${vehicle.phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="relative">
        <img 
          src={vehicle.photos[currentPhotoIndex]} 
          alt={vehicle.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        {vehicle.photos.length > 1 && (
          <div className="absolute top-1/2 w-full flex justify-between px-2">
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              &larr;
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{vehicle.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600">{vehicle.year} • {vehicle.miles.toLocaleString()} millas</span>
          <span className="font-bold text-lg text-blue-600">${vehicle.price.toLocaleString()}</span>
        </div>

        <div className="mt-4 flex space-x-2">
          <button 
            onClick={handleContact}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
          >
            Contactar
          </button>
          
          {isAdmin && (
            <div className="flex space-x-2">
              {vehicle.pending && (
                <>
                  <button 
                    onClick={() => onApprove(vehicle.id)}
                    className="px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    ✓
                  </button>
                  <button 
                    onClick={() => onReject(vehicle.id)}
                    className="px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </>
              )}
              {!vehicle.pending && (
                <button 
                  onClick={() => onDeactivate(vehicle.id)}
                  className="px-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Baja
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="relative">
              <img 
                src={vehicle.photos[currentPhotoIndex]} 
                alt={vehicle.name}
                className="w-full max-h-[70vh] object-contain"
              />
              {vehicle.photos.length > 1 && (
                <div className="absolute top-1/2 w-full flex justify-between px-4 transform -translate-y-1/2">
                  <button 
                    onClick={handlePrevPhoto}
                    className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 text-xl"
                  >
                    &larr;
                  </button>
                  <button 
                    onClick={handleNextPhoto}
                    className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 text-xl"
                  >
                    &rarr;
                  </button>
                </div>
              )}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-bold">{vehicle.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p><span className="font-semibold">VIN:</span> {vehicle.vin}</p>
                  <p><span className="font-semibold">Año:</span> {vehicle.year}</p>
                  <p><span className="font-semibold">Marca/Modelo:</span> {vehicle.make} {vehicle.model}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Título:</span> {vehicle.title}</p>
                  <p><span className="font-semibold">Millas:</span> {vehicle.miles.toLocaleString()}</p>
                  <p><span className="font-semibold">Contacto:</span> {vehicle.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;