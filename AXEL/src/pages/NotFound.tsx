
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-axelari-navy-light/50 p-4 rounded-full">
            <AlertTriangle className="h-16 w-16 text-axelari-teal" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-6">Oops! Page not found</p>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-axelari-teal to-axelari-purple text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
