// src/pages/MainPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContexts';

const MainPage = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {/* <h1>Welcome to the Main Page</h1> */}
    </div>
  );
};

export default MainPage;
