import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function SellerRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser || !currentUser.isSeller) {
    return <Navigate to="/" />;
  }
  
  return children;
}
