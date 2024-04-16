import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);
  if (!isLoading && user) {
    if (!isLoggedIn) {
      return <Navigate to="/login"  />;
    }
    return children;
  }
};

export default ProtectedRoute;
