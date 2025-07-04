import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    navigate("/login", { replace: true });
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold shadow ml-2"
    >
      Logout
    </button>
  );
}
