import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-center">
      <FiLoader className="h-12 w-12 animate-spin text-black" />
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        Loading
      </h2>
      <p className="mt-2 text-base text-gray-600">
        Please wait while we prepare the content for you.
      </p>
    </div>
  );
};

export default Loader;