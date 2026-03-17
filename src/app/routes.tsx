import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Landing } from "./pages/Landing";
import { PurchaseFlow } from "./pages/PurchaseFlow";
import { MyTickets } from "./pages/MyTickets";
import { EventDetail } from "./pages/EventDetail";
import { Treasurer } from "./pages/dashboard/Treasurer";
import { Organizer } from "./pages/dashboard/Organizer";
import { Admin } from "./pages/dashboard/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Landing },
      { path: "buy/:id", Component: PurchaseFlow },
      { path: "my-tickets", Component: MyTickets },
      { path: "event/:id", Component: EventDetail },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { path: "treasurer", Component: Treasurer },
      { path: "organizer", Component: Organizer },
      { path: "admin", Component: Admin },
    ],
  },
]);