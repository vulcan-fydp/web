import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Login";

export const LoginRouter = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="forgot-password" element={null} />
      <Route path="google" element={null} />
      <Route path="facebook" element={null} />
    </Routes>
  );
};
