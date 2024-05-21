import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) 
    
  return <Navigate to="/login" replace />;//replace es para que se borre la direccion actual
  return <Outlet />;//continua con el componente que esta adentro
};
