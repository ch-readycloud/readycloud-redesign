import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import LowFidelity from "./pages/LowFidelity";
import Pricing from "./pages/Pricing";
import StaticOverview from "./pages/StaticOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/low-fidelity",
    Component: LowFidelity,
  },
  {
    path: "/pricing",
    Component: Pricing,
  },
  {
    path: "/static-overview",
    Component: StaticOverview,
  },
]);