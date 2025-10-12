import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdPermContactCalendar } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { Menu } from "antd";
import { logout } from "../../redux/app/authSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLinks = [
    { path: "/chat", label: "Chats", icon: <LuMessageCircleMore /> },
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
  console.log(isAdmin);

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
    <div className="flex flex-col h-[100%] pt-10">
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
            icon: <IoIosLogOut />,
            label: "Logout",
          },
        ]}
        style={{ borderTop: "1px solid #333", color: "red" }}
      />
    </div>
  );
};

export default Sidebar;
