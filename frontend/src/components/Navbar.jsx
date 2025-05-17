import {
  ShoppingCart,
  Lock,
  LogOut,
  UserPlus,
  ShoppingBag,
  User2Icon
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  const navigate = useNavigate();

  const location = useLocation();
  const isHomePage =
    location.pathname === "/" || location.pathname.startsWith("/products");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to log out ? ");

    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };
  const isAdmin = user?.isAdmin === true;
  const isUser = user && !user.isAdmin;
  const isVisitor = !user;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) getUserInfo();
  }, [localStorage.getItem("authToken")]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(
        `/products/Search?name=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

  const baseLinkClass =
    "px-4 py-2 rounded-full text-sm md:text-base font-semibold transition duration-300";

  const blueStyle = {
    color: "#1F2937",
    backgroundColor: "transparent",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#1F2937";
    e.currentTarget.style.color = "#ffffff";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = "#1F2937";
  };
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 h-15">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold"
          style={{ fontFamily: "Pacifico", color: "#E69DB8" }}
        >
          SugerBloom
        </Link>

        {/* Search Bar */}
        {isHomePage && (
          <div className="w-full max-w-xs sm:max-w-sm block">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full px-4 py-2 border border-[#E69DB8] rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E69DB8] text-sm"
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-3">
          {/* Home */}
          <Link
            to="/"
            style={blueStyle}
            className={baseLinkClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Home
          </Link>

          {/* ✅ User Links */}
          {isUser && (
            <>
              <Link
                to="/cartPage"
                style={blueStyle}
                className={`${baseLinkClass} flex items-center gap-2`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ShoppingCart size={18} />
                Cart
              </Link>
              {
                <Link
                  to="/OrdersPage"
                  style={blueStyle}
                  className={`${baseLinkClass} flex items-center gap-2`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <ShoppingBag size={18} />
                  Order
                </Link>
              }

              {
                <Link
                  to="/UserProfilePage"
                  style={blueStyle}
                  className={`${baseLinkClass} flex items-center gap-2`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <User2Icon size={18} />
                  User Profile
                </Link>
              }
              <button
                className={`${baseLinkClass} flex items-center gap-2`}
                style={blueStyle}
                onClick={handleLogout}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </>
          )}

          {/* ✅ Admin Links */}
          {isAdmin && (
            <>
              <Link
                to="/DashBoard"
                style={blueStyle}
                className={`${baseLinkClass} flex items-center gap-2`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Lock size={18} />
                Dashboard
              </Link>

              <button
                className={`${baseLinkClass} flex items-center gap-2`}
                style={blueStyle}
                onClick={handleLogout}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </>
          )}

          {/* ✅ Visitor Links */}
          {isVisitor && (
            <>
              <Link
                to="/Signup"
                style={blueStyle}
                className={`${baseLinkClass} flex items-center gap-2`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <UserPlus size={18} />
                Sign Up
              </Link>

              <Link
                to="/login"
                style={blueStyle}
                className={`${baseLinkClass} flex items-center gap-2`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <LogOut size={18} />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
