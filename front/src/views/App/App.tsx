import React, { lazy, Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../Login"));
const Signup = lazy(() => import("../Signup"));
const NotFound = lazy(() => import("../NotFound"));
const Home = lazy(() => import("../Home"));

const App = (): JSX.Element => {
  return (
    // Note: We could put a MIUI component here, but that's not
    // Necessary considering the loading time
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
