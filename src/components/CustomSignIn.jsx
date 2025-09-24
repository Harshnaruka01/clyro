import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function CustomSignIn() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
       <ClerkSignIn 
         routing="path"
         path="/auth/sign-in"
         fallbackRedirectUrl="/"
         signUpUrl="/auth/sign-up"
         appearance={{
           elements: {
             card: 'shadow-none',
             formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
           },
         }}
       />
    </div>
  );
}

export default CustomSignIn;
