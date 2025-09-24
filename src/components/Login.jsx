import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import CustomSignIn from "./CustomSignIn";
import SignUp from "./Signup";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Login() {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        duration: 1,
        opacity: 0,
        scale: 0.9,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>
      <SignedOut>
        <div className="w-full max-w-md space-y-8" ref={cardRef}>
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
