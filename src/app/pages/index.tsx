import { Routes, Route } from "react-router-dom";
import { Home } from "app/pages/Home";
import { LoginRouter } from "app/pages/login";
import { RoomRouter } from "app/pages/room";
import { ControllersRouter } from "app/pages/controllers";
import { AccountPage } from "app/pages/account";
import { SignUpPage } from "app/pages/signup";

export const Pages = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="room/*" element={<RoomRouter />} />
    <Route path="login" element={<LoginRouter />} />
    <Route path="signup" element={<SignUpPage />} />
    <Route path="controllers/*" element={<ControllersRouter />} />
    <Route path="account" element={<AccountPage />} />
  </Routes>
);
