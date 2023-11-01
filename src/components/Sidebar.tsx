import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

interface Panel {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar = ({ panels }: { panels: Panel[] }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState("");
  const [hoveredPanel, setHoveredPanel] = useState("");

  useEffect(() => {
    const currentPanel = panels.find((panel) =>
      location.pathname.startsWith(panel.path)
    );
    if (currentPanel) {
      setSelectedPanel(currentPanel.name);
    }
  }, [location.pathname, panels]);

  const handlePanelClick = (panel: string) => {
    setSelectedPanel(panel);
  };

  const handleMouseEnter = (panel: string) => {
    if (collapsed) {
      setHoveredPanel(panel);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPanel("");
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-full p-4 duration-200 flex flex-col justify-between`}
    >
      <div className="flex flex-col gap-y-2">
        {panels.map((panel) => (
          <div
            className="relative"
            key={panel.name}
            onMouseEnter={() => handleMouseEnter(panel.name)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={panel.path}
              className={`flex items-center gap-x-3 p-2 cursor-pointer rounded-md ${
                selectedPanel === panel.name
                  ? "bg-gray-200 text-primary-100"
                  : "hover:bg-gray-200 text-secondary-100"
              }`}
              onClick={() => handlePanelClick(panel.name)}
            >
              <span className="text-2xl">{panel.icon}</span>
              <span
                className={`${
                  collapsed && "hidden"
                } origin-left duration-200 text-md  whitespace-nowrap`}
              >
                {panel.name}
              </span>
            </Link>
            {collapsed && hoveredPanel === panel.name && (
              <div className="absolute top-1/2 left-16 transform ">
                <div className="absolute bg-gray-200 text-sm text-gray-700 p-2 rounded-md whitespace-nowrap -translate-y-1/2">
                  {panel.name}
                </div>
                <div className="absolute bg-gray-200 w-3 h-3 transform rotate-45 top-1/2 -translate-y-1/2 -translate-x-1/2" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center text-3xl w-full"
      >
        <div className="p-2 rounded-md cursor-pointer">
          {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
