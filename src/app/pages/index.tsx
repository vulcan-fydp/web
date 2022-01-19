import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { LoginRouter } from "app/pages/login";
import { RoomRouter } from "./room";
import { ControllersRouter } from "./controllers";
import { AccountPage } from "./account";

export const Pages = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="room/*" element={<RoomRouter />} />
    <Route path="login" element={<LoginRouter />} />
    <Route path="controllers/*" element={<ControllersRouter />} />
    <Route path="account" element={<AccountPage />} />
  </Routes>
);
