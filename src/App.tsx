import { RouterProvider } from "react-router";
import { router } from "./routes";
import {UserProvider} from "./context/UserContext";
import { PWAUpdatePrompt } from "./components/PWAUpdatePrompt";
import { InstallPrompt } from "./components/InstallPrompt";

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <PWAUpdatePrompt />
      <InstallPrompt />
    </UserProvider>
  );
}
