import React, { useState } from 'react';
import { Check } from 'lucide-react';

const financialServices = [
  'Tax Services',
  'Pension and Retirement Services',
  'Home loans',
  'Business loans',
  'Student loans',
  'Health insurance',
  'Car insurance',
  'Liability insurance',
  'Disability insurance',
];

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
  });
  const [token, setToken] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter(service => service !== value),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert('Please select at least one financial service.');
      return;
    }
    // Generate a random 8-character token
    const newToken = Math.random().toString(36).substring(2, 10).toUpperCase();
    setToken(newToken);
    // Here you would typically send the formData to your backend
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Customer Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <p className="block text-gray-700 font-bold mb-2">Interested Financial Services</p>
            {financialServices.map(service => (
              <label key={service} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{service}</span>
              </label>
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Register for Lucky Draw
          </button>
        </form>
        {token && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md">
            <p className="text-green-700 font-semibold flex items-center">
              <Check className="mr-2" /> Registration Successful!
            </p>
            <p className="text-green-700">Your unique token: <span className="font-bold">{token}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;