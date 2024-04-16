import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);
  if (!isLoading && user) {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    } else if(user.role !== "admin"){
        return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;
