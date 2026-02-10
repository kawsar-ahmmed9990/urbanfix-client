import React from "react";
import { VscIssues } from "react-icons/vsc";
import { Link, NavLink, Outlet } from "react-router";
import { CgProfile } from "react-icons/cg";
import {
  MdFormatListBulletedAdd,
  MdManageAccounts,
  MdManageHistory,
  MdPayment,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { dbUser } = useAuth();
  const dashboard = dbUser?.role;

  const role = dbUser?.role || "citizen";

  const menuConfig = {
    citizen: [
      {
        label: "Home",
        to: "/dashboard",
        icon: RxDashboard,
      },
      {
        label: "Report Issue",
        to: "/dashboard/reportissue",
        icon: MdFormatListBulletedAdd,
      },
      {
        label: "My Issues",
        to: "/dashboard/myissues",
        icon: VscIssues,
      },
      {
        label: "Profile",
        to: "/dashboard/myprofile",
        icon: CgProfile,
      },
    ],

    staff: [
      {
        label: "Home",
        to: "/staffdashboard",
        icon: RxDashboard,
      },
      {
        label: "Assigned Issues",
        to: "/staffdashboard/assignissue",
        icon: VscIssues,
      },
      {
        label: "Profile",
        to: "/staffdashboard/profile",
        icon: CgProfile,
      },
    ],

    admin: [
      {
        label: "Home",
        to: "/admindashboard",
        icon: RxDashboard,
      },
      {
        label: "All Issues",
        to: "/admindashboard/allissue",
        icon: VscIssues,
      },
      {
        label: "Manage Users",
        to: "/admindashboard/manageusers",
        icon: MdManageAccounts,
      },
      {
        label: "Manage Staff",
        to: "/admindashboard/managestaff",
        icon: MdManageHistory,
      },
      {
        label: "Payments page",
        to: "/admindashboard/payments",
        icon: MdPayment,
      },
      {
        label: "Profile",
        to: "/admindashboard/profile",
        icon: CgProfile,
      },
    ],
  };
  const menus = menuConfig[role];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="text-2xl font-bold px-4">{dashboard} Dashboard</div>
        </nav>

        <div className="max-w-11/12 mx-auto my-5">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {menus.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip={item.label}
                  >
                    <Icon className="text-lg" />
                    <span className="is-drawer-close:hidden">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
