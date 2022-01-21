import { Route, Routes } from "react-router-dom";
import { Dashboard, DashboardTabContainer } from "app/pages/room/Room";
import { JoinOrHostRoom } from "./JoinOrHostRoom";

export const RoomRouter = () => {
  return (
    <Routes>
      <Route index element={<JoinOrHostRoom />} />
      <Route path=":roomId">
        <Route index element={<JoinOrHostRoom />} />
        <Route path="*" element={<Dashboard />}>
          <Route
            path="stream"
            element={<DashboardTabContainer tab="stream" />}
          />
          <Route
            path="players"
            element={<DashboardTabContainer tab="player" />}
          />
          <Route
            path="controller"
            element={<DashboardTabContainer tab="controller" />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
