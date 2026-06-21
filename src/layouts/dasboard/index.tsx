import { Outlet } from "react-router-dom";
import NavBar from "../navbar";
import "./index.css";
import Header from "../header";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <NavBar />
      <div className="dashboard-content">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
