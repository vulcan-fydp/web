import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DocsPages } from "./docs";
import { HomePage } from "./Home";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="docs/*" element={<DocsPages />} />
    </Routes>
  </BrowserRouter>
);
