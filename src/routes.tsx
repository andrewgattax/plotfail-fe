import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "@/pages/Home";
import NotFound from "@/pages/NotFound.tsx";
import Footer from "@/components/footer.tsx";
import Signup from "@/pages/Signup.tsx";
import Storie from "@/pages/Storie.tsx";
import Explore from "@/pages/Explore.tsx";
import {Explore2} from "@/pages/Explore2.tsx";
import Login from "@/pages/Login.tsx";

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
        path: "/explore",
        Component: Explore2
      },
      {
        path: "/profile",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup
      },
      {
        path: "/storie",
        Component: Storie
      },
      {
        path: "*",
        Component: NotFound,
      }
    ]
  }
]);
