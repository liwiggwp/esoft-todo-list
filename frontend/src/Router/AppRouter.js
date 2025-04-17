import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Router from "./RouteNames";
import Home from "../Pages/Home";
import LoginForm from "../Components/auth/LoginForm";
import RegisterForm from "../Components/auth/RegisterForm";

function AppRouter() {
  return (
    <Routes>
      <Route path={Router.HOME} element={<Home />} />
      <Route path={Router.AUTH + Router.LOGIN} element={<LoginForm />} />
      <Route path={Router.AUTH + Router.REGISTER} element={<RegisterForm />} />
    </Routes>
  );
}

export default AppRouter;
