import React from 'react';
import { useNavigate } from 'react-router-dom';

const RateLimitError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Rate Limit Exceeded</h1>
        <div className="text-gray-600 mb-6">
          <p className="mb-4">You've made too many requests in a short period.</p>
          <p>Please wait a minute before trying again.</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default RateLimitError;