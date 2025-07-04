import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RequireAdminAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const isLoggedIn = sessionStorage.getItem("admin_logged_in") === "true";
      if (!isLoggedIn) {
        navigate("/login", { replace: true });
      }
    };
    checkLogin();

    let idleTimer = null;
    const idleTimeout = 15 * 60 * 1000; // 15 menit
    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        sessionStorage.removeItem("admin_logged_in");
        navigate("/login", { replace: true });
      }, idleTimeout);
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "touchstart"];
    activityEvents.forEach(event => window.addEventListener(event, resetIdleTimer));
    resetIdleTimer();

    // Cleanup
    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      activityEvents.forEach(event => window.removeEventListener(event, resetIdleTimer));
    };

  }, [navigate]);

  return children;
}
