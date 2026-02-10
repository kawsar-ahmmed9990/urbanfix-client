import React from "react";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, dbUser, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "Logged out successfully!",
        }).then(() => {
          // navigate("/");
          navigate("/", { replace: true });
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: e.message,
        });
      });
  };

  // NavLinks with active style
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-emerald-500 font-bold" : "text-slate-700"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allissues"
          className={({ isActive }) =>
            isActive ? "text-emerald-500 font-bold" : "text-slate-700"
          }
        >
          All Issues
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-emerald-500 font-bold" : "text-slate-700"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/mission"
          className={({ isActive }) =>
            isActive ? "text-emerald-500 font-bold" : "text-slate-700"
          }
        >
          Our Mission
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0}>
              <div className="w-12">
                <img
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  src={
                    user?.photoURL || "https://i.ibb.co/Kcdb9M8W/download-1.png"
                  }
                  alt="user"
                />
              </div>
            </label>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow">
              <li className="font-semibold text-center cursor-default">
                {user?.displayName || "Anonymous User"}
              </li>
              <div className="divider my-1"></div>
              <li className="font-bold flex mx-auto">
                <NavLink
                  to={
                    dbUser?.role === "admin"
                      ? "/admindashboard"
                      : dbUser?.role === "staff"
                        ? "/staffdashboard"
                        : "/dashboard"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="font-bold flex mx-auto">
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn">
            Log in
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
