import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Login from './components/Login';
import './App.css';

// Get the publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path="/auth/*" element={<Login />} />
        <Route path="/" element={
          <>
            <div>Welcome to your dashboard!</div>
            {/* You can add your protected content here */}
          </>
        } />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </ClerkProvider>
  );
}

export default App;