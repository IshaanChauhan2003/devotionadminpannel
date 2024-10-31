import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Importing eye icons from react-icons
import { useNavigate } from 'react-router-dom';
function Loginform() {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate(); 
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSignIn = () => {
    navigate('/home'); // Navigate to the AdminSection
  };
  return (
    <div className="w-full max-w-sm md:max-w-md pt-8 border border-gray-800 rounded-2xl shadow-md bg-gray-200">
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>
      
      {/* Username Input */}
      <div className="mb-6 px-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username/Email
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-3 py-4 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
          placeholder="Enter your username"
        />
      </div>

      {/* Password Input */}
      <div className="mb-8 px-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'} // Toggle between text and password types
          id="password"
          className="w-full border border-gray-400 px-3 py-4 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
          placeholder="Enter your password"
        />
        {/* Eye icon for password visibility */}
        <span 
          className="absolute right-8 top-14 transform -translate-y-1/2 cursor-pointer" 
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <AiFillEyeInvisible className="text-gray-600" /> : <AiFillEye className="text-gray-600" />}
        </span>
      </div>

   
      <button 
        className="w-full py-4 px-4 bg-gray-800 text-white font-bold rounded-b-2xl hover:bg-gray-600"
        onClick={handleSignIn} // Call the handleSignIn function
      >
        Sign In
      </button>
    </div>
  );
}

export default Loginform;
