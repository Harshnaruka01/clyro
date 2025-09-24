import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function CustomSignIn() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md">
        <ClerkSignIn 
          routing="path"
          path="/auth/sign-in"
          afterSignInUrl="/"
          signUpUrl="/auth/sign-up"
          redirectUrl="/"
          appearance={{
            elements: {
              card: 'shadow-none w-full',
              rootBox: 'w-full',
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 w-full',
              formFieldInput: 'w-full',
              formField: 'w-full',
              form: 'w-full',
              cardContent: 'w-full',
              footerAction: 'w-full',
              footerActionLink: 'w-full block text-center',
              socialButtons: 'w-full',
              socialButtonsBlockButton: 'w-full',
              socialButtonsBlockButtonText: 'w-full text-center',
              formFieldAction: 'w-full',
              formFieldShowPasswordButton: 'w-full',
              formFieldShowPassword: 'w-full',
              formFieldInputShowPasswordButton: 'w-full',
              formFieldInputShowPassword: 'w-full',
              formFieldInputShowPasswordIcon: 'w-full',
              formFieldInputShowPasswordIconContainer: 'w-full',
              formFieldInputShowPasswordIconSvg: 'w-full',
              formFieldInputShowPasswordIconPath: 'w-full',
              formFieldInputShowPasswordIconRect: 'w-full',
            },
          }}
        />
      </div>
    </div>
  );
}

export default CustomSignIn;
