import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ProtectedRouteProps } from "../types/auth";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!loading && !isAuthenticated) navigate("/");
    },
    [loading, isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
