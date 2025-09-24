import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';

function SignUp() {
  return (
    <div className="auth-container">
      <ClerkSignUp 
        routing="path"
        path="/auth/sign-up"
        signInUrl="/auth/sign-in"
        afterSignUpUrl="/"
        redirectUrl="/"
      />
    </div>
  );
}

export default SignUp;