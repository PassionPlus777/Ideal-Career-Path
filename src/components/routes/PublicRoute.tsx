import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../core/config/firebase";
import Loading from "../../shared/components/common/Loading";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
