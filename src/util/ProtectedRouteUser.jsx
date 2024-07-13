// import { useNavigate } from "react-router-dom";

// const isAuthenticated = () => {
//     console.log(localStorage.getItem('access_token'));
//     return localStorage.getItem('access_token') !== null
// };

// export const ProtectedRouteUser = ({ children }) => {
//     const navigate = useNavigate();
//     return isAuthenticated() ? children : navigate("/userlogin");
// };

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isAuthenticated = () => {
  console.log(localStorage.getItem('access_token'));
  return localStorage.getItem('access_token') !== null;
};

export const ProtectedRouteUser = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userlogin");
    if (!isAuthenticated()) {
      navigate("/userlogin");
    }
  }, [navigate]);

  return isAuthenticated() ? children : null;
};
