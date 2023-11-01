import Sidebar from "../components/Sidebar";
import { HiDatabase, HiShieldCheck } from "react-icons/hi";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const panels = [
  {
    name: "Dashboard",
    icon: <HiDatabase className="mr-2" />,
    path: "/dashboard",
  },
  {
    name: "Create Survey",
    icon: <HiShieldCheck className="mr-2" />,
    path: "/survey",
  },
];
const Layout: React.FC = () => {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="flex h-navH overflow-hidden ">
        <Sidebar panels={panels} />
        <div className="p-4 w-full h-navH overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
