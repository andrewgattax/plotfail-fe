import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "@/pages/Home";
import Login from "@/pages/Login.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Footer from "@/components/footer.tsx";

function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/profile",
        Component: Login,
      },
      {
        path: "*",
        Component: NotFound,
      }
    ]
  }
]);
