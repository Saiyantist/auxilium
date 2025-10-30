// src/routes/AppRouter.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <AppLayout>
        <About />
      </AppLayout>
    ),
  },
  // {
  //   path: "*",
  //   element: (
  //     <AppLayout>
  //       <NotFound />
  //     </AppLayout>
  //   ),
  // },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
