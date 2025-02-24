import React from "react";
import { Link } from "react-router-dom"; 
import { FaRegSadCry } from "react-icons/fa"; 

const NotFoundPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <div className="display-1 text-primary">
          <FaRegSadCry />
        </div>
        <h1 className="display-3 font-weight-bold text-dark">
          Oops! Page Not Found
        </h1>
        <p className="lead text-muted">
          The page you're looking for doesn't exist. It might have been moved or
          deleted.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
