import {useNavigate} from "react-router";
import {useUser} from "@/context/UserContext.tsx";
import {LoadingPage} from "@/components/utils/LoadingPage.tsx";
import {useEffect} from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: string;
}

export function ProtectedRoute({children, fallback = "/login"}: ProtectedRouteProps) {
  const {user, isLoading} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(fallback, {replace: true});
    }
  }, [isLoading, user, navigate, fallback]);

  if (isLoading || !user) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
