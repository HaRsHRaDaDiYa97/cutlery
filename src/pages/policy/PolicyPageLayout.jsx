import React from 'react';

const PolicyPageLayout = ({ title, lastUpdated, children }) => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm leading-8 text-gray-600">
            Last Updated: {lastUpdated}
          </p>
        </div>
        <div className="mt-12">
            {/* The `prose` class from Tailwind Typography handles all the content styling */}
            <article className="prose lg:prose-lg mx-auto">
                {children}
            </article>
        </div>
      </div>
    </div>
  );
};

export default PolicyPageLayout;