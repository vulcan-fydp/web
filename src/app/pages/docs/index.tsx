import { Route, Routes } from "react-router-dom";
import { Docs } from "./Docs";

export const DocsRouter = () => {
  return (
    <Routes>
      <Route index element={<Docs />} />
    </Routes>
  );
};

export const DocsRoutes = {
  base: () => "/docs",
  vulcast: () => DocsRoutes.base() + "/vulcast",
};
