import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(titleRef.current, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power3.out',
    })
      .from(
        subtitleRef.current,
        {
          duration: 1,
          y: 100,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.8'
      )
      .from(
        ctaRef.current,
        {
          duration: 1,
          opacity: 0,
          y: 50,
          ease: 'power3.out',
        },
        '-=0.6'
      );
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">EventHorizon</h1>
        <nav>
          <Link
            to="/auth/sign-in"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div ref={heroRef} className="text-center">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-4"
          >
            Your Events, Reimagined.
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Create, share, and relive your best moments. The social hub for all your events, big or small.
          </p>
          <div ref={ctaRef}>
            <Link
              to="/auth/sign-up"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg inline-flex items-center transition duration-300 transform hover:scale-105"
            >
              Get Started Free <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} EventHorizon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
