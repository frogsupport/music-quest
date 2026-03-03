import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useNavigateToLoginOnTimeout({ delay }: { delay?: number }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => navigate("login"), delay);

    return () => clearTimeout(timeoutId);
  }, [delay, navigate]);
}
