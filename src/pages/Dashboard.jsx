import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold">Welcome to your Dashboard</h1>
      <p className="mt-4">This is your protected dashboard. Only authenticated users can see this.</p>
    </div>
  );
};

export default Dashboard;
