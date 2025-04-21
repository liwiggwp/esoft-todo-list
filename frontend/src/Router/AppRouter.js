import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home";
import LoginForm from "../Components/auth/LoginForm";
import RegisterForm from "../Components/auth/RegisterForm";
import Error404 from "../Pages/404";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/auth/login" element={<LoginForm />} />
      <Route path="/auth/register" element={<RegisterForm />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default AppRouter;
