import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdPermContactCalendar } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { PiStarFour } from "react-icons/pi";
import { Menu } from "antd";
import { logout } from "../../redux/app/authSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLinks = [
    { path: "/novachat", label: "Novachat", icon: <PiStarFour /> },
    { path: "/chats", label: "Chats", icon: <LuMessageCircleMore /> },
    { path: "/contacts", label: "Contacts", icon: <MdPermContactCalendar /> },
    { path: "/settings", label: "Settings", icon: <IoIosSettings /> },
  ];

  const adminLinks = [
    { path: "/admin-dashboard", label: "Dashboard", icon: <RiDashboardFill /> },
    { path: "/users", label: "Users", icon: <FaUserFriends /> },
    { path: "/chats", label: "Chats", icon: <LuMessageCircleMore /> },
    { path: "/files", label: "Files", icon: <MdPermContactCalendar /> },
    { path: "/settings", label: "Settings", icon: <IoIosSettings /> },
  ];

  const isAdmin = user?.isAdmin;
  // console.log(isAdmin);

  const navLinks = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear;
    navigate(isAdmin ? "/admin-login" : "/login");
  };

  const menuItems = navLinks.map((link) => ({
    key: link.path,
    icon: link.icon,
    label: link.label,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative left-12 sm:left-8 w-full flex justify-center items-center py-4">
        <Link to="/chat-dashboard">
          <img
            src="/Logo.png"
            alt="NovaChat AI"
            className="w-1/2 max-w-xs transition-all duration-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]"
          />
        </Link>
      </div>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => {
          if (key === "logout") {
            handleLogout();
          } else {
            navigate(key);
          }
        }}
        items={menuItems}
        style={{
          fontSize: 15,
          flex: 1,
          borderRight: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <Menu
        mode="inline"
        theme="dark"
        selectable={false}
        onClick={({ key }) => {
          if (key === "logout") handleLogout();
        }}
        items={[
          {
            key: "logout",
            icon: <IoIosLogOut className="custom-dark-color" />,
            label: <span className="text-red-500 font-medium">Logout</span>,
          },
        ]}
        style={{ borderTop: "1px solid #333"}}
      />
    </div>
  );
};

export default Sidebar;
