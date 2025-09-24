import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import SignUp from './SignUp';
import CustomSignIn from './CustomSignIn';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>
      <SignedOut>
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
            <Routes>
              <Route index element={<Navigate to="sign-in" replace />} />
              <Route path="sign-in/*" element={<CustomSignIn />} />
              <Route path="sign-up/*" element={<SignUp />} />
              <Route path="login" element={<Navigate to="sign-in" replace />} />
              <Route path="*" element={<Navigate to="sign-in" replace />} />
            </Routes>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
