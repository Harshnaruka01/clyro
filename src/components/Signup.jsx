import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';

function SignUp() {
  return (
    <div className="auth-container">
      <ClerkSignUp 
        routing="path"
        path="/auth/sign-up"
        signInUrl="/auth/sign-in"
        fallbackRedirectUrl="/"
        appearance={{
          elements: {
            card: 'shadow-none',
          },
        }}
      />
    </div>
  );
}

export default SignUp;