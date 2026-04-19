import { createBrowserRouter } from "react-router";
import { MobileShell } from "./components/MobileShell";
import { Home } from "@/screens/Home";
import { Generate } from "@/screens/Generate";
import { FillStory } from "@/screens/FillStory";
import { Result } from "@/screens/Result";
import { Saved } from "@/screens/Saved";
import Explore from "@/screens/Explore.tsx";
import { Profile } from "@/screens/Profile";
import { StoryDetail } from "@/screens/StoryDetail";
import { TemplateDetail } from "@/screens/TemplateDetail";
import { Login } from "@/screens/Login";
import { NotFound } from "@/screens/NotFound";
import { SearchPage } from "@/screens/SearchPage.tsx";
import { ProtectedRoute } from "./components/utils/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileShell,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "generate", Component: Generate },
      { path: "saved", Component: Saved },
      { path: "explore", Component: Explore },
      { path: "search", Component: SearchPage },
      {
        path: "profile",
        Component: () => (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      { path: "story/:id", Component: StoryDetail },
      { path: "template/:id", Component: TemplateDetail },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/fill/:templateId",
    Component: FillStory,
  },
  {
    path: "/result",
    Component: Result,
  },
]);