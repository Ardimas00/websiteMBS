import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RequireAdminAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return children;
}
