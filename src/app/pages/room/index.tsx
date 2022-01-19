import { Route, Routes } from "react-router-dom";
import { Dashboard } from "app/pages/room/Room";
import { JoinOrHostRoom } from "./JoinOrHostRoom";

export const RoomRouter = () => {
  return (
    <Routes>
      <Route index element={<JoinOrHostRoom />} />
      <Route path=":roomId">
        <Route index element={<JoinOrHostRoom />} />
        <Route path="*" element={() => <Dashboard />} />
      </Route>
    </Routes>
  );
};
