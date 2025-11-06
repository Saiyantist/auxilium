// src/routes/AppRouter.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Landing from "@/pages/Landing";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/landing_test",
        element: <Landing />,
      },
    ],
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
