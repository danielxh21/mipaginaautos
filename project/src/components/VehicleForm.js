import React, { useState } from 'react';
import { addVehicle } from '../services/vehicleService';

const VehicleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    vin: '',
    year: '',
    make: '',
    model: '',
    miles: '',
    title: 'Clean',
    price: '',
    phone: '',
    email: '',
    photos: [],
    pending: true,
    status: 'pending'
  });
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    
    const newPreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setPhotoPreviews(prev => [...prev, ...newPreviews].slice(0, 5));
  };

  const removePhoto = (index) => {
    setPhotoPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].preview);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const vehicleData = {
        ...formData,
        year: parseInt(formData.year),
        miles: parseInt(formData.miles),
        price: parseInt(formData.price),
        photos: photoPreviews.map(p => p.preview),
      };
      
      const newVehicle = await addVehicle(vehicleData);
      onSubmit(newVehicle);
    } catch (error) {
      console.error("Error adding vehicle:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Registrar Vehículo</h2>
      
      {/* ... (resto del formulario se mantiene igual que en la versión anterior) ... */}
    </form>
  );
};

export default VehicleForm;