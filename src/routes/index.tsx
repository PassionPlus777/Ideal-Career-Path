import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy loading wrapper component
const LazyLoad: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

// Lazy load components
const MainLayout = React.lazy(() => import("../layouts/MainLayout"));
const Welcome = React.lazy(() => import("../pages/Welcome/Welcome"));
const Login = React.lazy(() => import("../features/auth/pages/Login"));
const Signup = React.lazy(() => import("../features/auth/pages/Signup"));
const Decision = React.lazy(() => import("../features/career/pages/Decision"));
const Pathway = React.lazy(() => import("../pages/Pathway/Pathway"));

// Lazy load other pages
const Pricing = React.lazy(() => import("../pages/Pricing"));
const Profile = React.lazy(() => import("../pages/Profile"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LazyLoad>
        <MainLayout />
      </LazyLoad>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyLoad>
            <Welcome />
          </LazyLoad>
        ),
      },
      {
        path: "pricing",
        element: (
          <LazyLoad>
            <Pricing />
          </LazyLoad>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <LazyLoad>
              <Profile />
            </LazyLoad>
          </ProtectedRoute>
        ),
      },
      {
        path: "decision",
        element: (
          <ProtectedRoute>
            <LazyLoad>
              <Decision />
            </LazyLoad>
          </ProtectedRoute>
        ),
      },
      {
        path: "pathway",
        element: (
          <ProtectedRoute>
            <LazyLoad>
              <Pathway />
            </LazyLoad>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LazyLoad>
        <Login />
      </LazyLoad>
    ),
  },
  {
    path: "/signup",
    element: (
      <LazyLoad>
        <Signup />
      </LazyLoad>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  // Add other routes here
  // Protected routes will be added later
]);
