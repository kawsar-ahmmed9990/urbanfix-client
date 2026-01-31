import React from "react";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        alert("Logged out successfully!");
        // navigate("/auth/signin");
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  console.log(user);
  const links = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>All Issues</a>
      </li>
      <li>
        <a>Extra one</a>
      </li>
      <li>
        <a>Extra two</a>
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="">
                <div className="w-12">
                  <img
                    className="w-10 h-10  md:w-12 md:h-12  rounded-full object-cover"
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/Kcdb9M8W/download-1.png"
                    }
                    alt="user"
                  />
                </div>
              </label>

              <ul
                // className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow"
              >
                <li className="font-semibold text-center cursor-default">
                  {user?.displayName || "Anonymous User"}
                </li>

                <div className="divider my-1"></div>

                <li>
                  <Link to="" className="font-bold flex mx-auto">
                    Dashboard
                  </Link>
                </li>
                {/* <div className="divider my-1"></div> */}
                <li className="font-bold flex mx-auto">
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to={"/login"} className="btn">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
