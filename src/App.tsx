import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import Background from "@/components/background.tsx";

export default function App() {
  return (
    <main className={"relative flex flex-col h-screen overflow-y-hidden overscroll-none"}>
      <Background />
      <RouterProvider router={router} />
    </main>
  );
}
