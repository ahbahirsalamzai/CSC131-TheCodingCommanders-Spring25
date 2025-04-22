

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Happy from '../assets/BeeHappy.webp'

export default function LoggedOut() {
const navigate = useNavigate();

// THIS IS A PLACE HOLDER FOR A POP UP - WHOLE FILE WILL BE DELETED LATER ON


return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1EADF]   ">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-4">
        🎉 You have successfully logged out!
        </h1>
        <p className="text-gray-600 mb-6">Thank you for using StudyHive.</p>
        <img src={Happy} alt="Bee" className="w-20 h-20 mx-auto mb-4"></img>
        <p className="text-gray-600 mb-6">Have A Great Day!</p>
        <button
        onClick={() => navigate('/')}
        className="bg-green-900 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
        >
        Back to Home
        </button>
    </div>
    </div>
  );
}