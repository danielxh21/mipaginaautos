import { 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc 
} from '../firebase/config';

const vehiclesCollection = collection(db, 'vehicles');

const getVehicles = async () => {
  const snapshot = await getDocs(vehiclesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addVehicle = async (vehicle) => {
  const docRef = await addDoc(vehiclesCollection, vehicle);
  return { id: docRef.id, ...vehicle };
};

const approveVehicle = async (id) => {
  const vehicleRef = doc(db, 'vehicles', id);
  await updateDoc(vehicleRef, { pending: false, status: 'approved' });
};

const rejectVehicle = async (id) => {
  const vehicleRef = doc(db, 'vehicles', id);
  await deleteDoc(vehicleRef);
};

const deactivateVehicle = async (id) => {
  const vehicleRef = doc(db, 'vehicles', id);
  await updateDoc(vehicleRef, { status: 'inactive' });
};

export { 
  getVehicles, 
  addVehicle, 
  approveVehicle, 
  rejectVehicle, 
  deactivateVehicle 
};