import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AddIssue from "../Pages/AddIssue/AddIssue";
import AllIssues from "../Pages/AllIssues/AllIssues";
import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import MyIssues from "../Pages/Dashboard/MyIssue/MyIssues";
import Profile from "../Pages/Dashboard/Profile/Profile";
import ReportIssue from "../Pages/Dashboard/ReportIssue/ReportIssue";
import IssueDetail from "../Pages/IssueDetail/IssueDetail";
import UpdateIssue from "../Pages/Dashboard/UpdateIssue/UpdateIssue";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/allissues",
        Component: AllIssues,
      },
      {
        path: "/issuedetail/:id",
        Component: IssueDetail,
      },
      {
        path: "/updateissue/:id",

        Component: UpdateIssue,
      },
      {
        path: "/addissue",
        Component: AddIssue,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "myissues",
        Component: MyIssues,
      },
      {
        path: "reportissue",
        Component: ReportIssue,
      },
      {
        path: "myprofile",
        Component: Profile,
      },
    ],
  },
]);
