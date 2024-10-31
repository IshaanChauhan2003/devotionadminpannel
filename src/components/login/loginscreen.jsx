import React from 'react';
import Loginform from './loginform';

function Login() {
    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
       
            <div className="flex-1 w-full bg-gray-800 flex flex-col items-center justify-center md:p-0 text-center">
          
                <h1 className="text-white text-2xl md:text-3xl font-medium mb-2">Welcome to</h1>
                
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Devotion App</h1>
                
                <h2 className="text-white text-lg md:text-xl font-semibold">Admin Panel</h2>
            </div>

            <div className="flex-1 w-full flex items-center justify-center p-6 md:p-0 bg-white">
                <Loginform/>
            </div>
        </div>
    );
}

export default Login;
