import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Routes, Route } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="sign-in" element={<SignIn routing="path" path="/auth/sign-in" />} />
        <Route path="sign-up" element={<SignUp routing="path" path="/auth/sign-up" />} />
      </Routes>
    </div>
  );
};

export default Auth;
