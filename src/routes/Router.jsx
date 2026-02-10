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
import UpdateIssue from "../Pages/Dashboard/UpdateIssue/UpdateIssue";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel/PaymentCancel";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess/PaymentSuccess";
import AdminDashboardHome from "../Pages/AdminDashboard/AdminDashboardHome/AdminDashboardHome";
import ManageUsers from "../Pages/AdminDashboard/ManageUsers/ManageUsers";
import ManageStaff from "../Pages/AdminDashboard/ManageStaff/ManageStaff";
import AllIssuesAdmin from "../Pages/AdminDashboard/AllIssuesAdmin/AllIssuesAdmin";
import PaymentsAdmin from "../Pages/AdminDashboard/PaymentsAdmin/PaymentsAdmin";
import StaffDashboardHome from "../Pages/StaffDashboard/StaffDashboardHome/StaffDashboardHome";
import AssignIssues from "../Pages/StaffDashboard/AssignIssues/AssignIssues";
import PrivateRoute from "./PrivateRoute";
import IssueDetails from "../Pages/IssueDetails/IssueDetails";
import About from "../Pages/About/About";
import OurMission from "../Pages/OurMission/OurMission";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allissues",
        element: <AllIssues></AllIssues>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/mission",
        element: <OurMission></OurMission>,
      },
      {
        path: "/issuedetail/:id",
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateissue/:id",
        element: <UpdateIssue></UpdateIssue>,
      },
      {
        path: "/addissue",
        element: <AddIssue></AddIssue>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login></Login>
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register></Register>
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
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
      {
        path: "paymentsuccess",
        Component: PaymentSuccess,
      },
      {
        path: "paymentcancel",
        Component: PaymentCancel,
      },
    ],
  },
  {
    path: "/admindashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: AdminDashboardHome,
      },
      {
        path: "allissue",
        Component: AllIssuesAdmin,
      },
      {
        path: "manageusers",
        Component: ManageUsers,
      },
      {
        path: "managestaff",
        Component: ManageStaff,
      },
      {
        path: "payments",
        Component: PaymentsAdmin,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "/staffdashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: StaffDashboardHome,
      },
      {
        path: "assignissue",
        Component: AssignIssues,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);
