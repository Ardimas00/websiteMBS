import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LogoutIcon() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/login", { replace: true });
  };
  return (
    <button
      onClick={handleLogout}
      title="Logout"
      className="fixed top-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition"
    >
      <FiLogOut size={24} />
    </button>
  );
}
