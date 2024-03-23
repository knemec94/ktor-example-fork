import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../util";
import { Login } from "./Login";
import { Register } from "./Register";

export const PublicApp = () => (
  <BrowserRouter>
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.register} element={<Register />} />
      <Route path="/*" element={<Navigate to={paths.login} replace />} />
    </Routes>
  </BrowserRouter>
);
