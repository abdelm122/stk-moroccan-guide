
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md">
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src="https://media.giphy.com/media/l0HlOBZcl7sbV6LnO/giphy.gif"
            alt="Lost student"
            className="w-full"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Lost like in Aufnahmetest?</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist, or maybe you took a wrong turn. 
          Don't worry, even the best students get lost sometimes!
        </p>
        <Link to="/">
          <Button className="stk-btn-primary">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
