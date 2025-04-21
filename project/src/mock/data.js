const mockVehicles = [
  {
    id: 1,
    name: "Toyota Corolla 2020",
    vin: "JT2BF22K1W0123456",
    year: 2020,
    make: "Toyota",
    model: "Corolla",
    miles: 25000,
    title: "Clean",
    status: "approved",
    price: 18500,
    phone: "+1234567890",
    email: "seller1@example.com",
    photos: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
      "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=800"
    ],
    pending: false
  },
  {
    id: 2,
    name: "Honda Civic 2018",
    vin: "2HGFC2F56JH654321",
    year: 2018,
    make: "Honda",
    model: "Civic",
    miles: 42000,
    title: "Clean",
    status: "approved",
    price: 16500,
    phone: "+1987654321",
    email: "seller2@example.com",
    photos: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800"
    ],
    pending: false
  },
  {
    id: 3,
    name: "Ford Mustang 2021",
    vin: "1FA6P8TH6M5102365",
    year: 2021,
    make: "Ford",
    model: "Mustang",
    miles: 15000,
    title: "Clean",
    status: "pending",
    price: 32500,
    phone: "+1555123456",
    email: "seller3@example.com",
    photos: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800"
    ],
    pending: true
  }
];

const mockAdmin = {
  id: 1,
  email: "admin@autos.com",
  isAdmin: true
};

export { mockVehicles, mockAdmin };