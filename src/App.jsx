import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import Login from './components/Login';
import './App.css';

// Get the publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path="/auth/*" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <div>Welcome to your dashboard!</div>
              </SignedIn>
              <SignedOut>
                <Navigate to="/auth/sign-in" replace />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

export default App;
