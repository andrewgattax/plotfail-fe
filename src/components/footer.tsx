import React from 'react';
import {Bookmark, Compass, HomeIcon, LogIn, User} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import { useLocation, Link } from "react-router-dom";

function Footer() {

  const iconSize = "w-8 h-8"
  const activeStyle = "text-primary drop-shadow-[0_0_15px_var(--color-primary)]"
  const notActiveStyle = "text-muted"
  const routes = [
    {
      icon: <HomeIcon className={iconSize}/>,
      title: "Home",
      route: "/"
    },
    {
      icon: <Compass className={iconSize}/>,
      title: "Esplora",
      route: "/explore"
    },
    {
      icon: <Bookmark className={iconSize}/>,
      title: "Salvati",
      route: "/saved"
    },
    {
      icon: <User className={iconSize}/>,
      title: "Profilo",
      route: "/profile"
    }
  ]

  const location = useLocation()
  const active = location.pathname

  return (
    <div
      className={"w-full bg-background/60 backdrop-blur-2xl rounded-t-4xl flex justify-between items-center px-8 py-10"}>
      {routes.map((route, index) => (
        <div className={"flex gap-5 items-center justify-center"} key={index}>
          <Link to={route.route}>
            <div
              className={`flex flex-col items-center justify-center gap-2 ${route.route === active ? activeStyle : notActiveStyle}`}>
              {route.icon}
              <p className={"text-sm font-bold"}>{route.title}</p>
            </div>
          </Link>
          {index !== routes.length - 1 && (
            <span className={"h-10"}><Separator orientation={"vertical"} className={"h-8"}/></span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Footer;