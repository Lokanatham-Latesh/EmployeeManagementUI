import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />

      <div className="container mt-5">
        <div className="text-center mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
