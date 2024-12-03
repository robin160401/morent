import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useThemeContext } from "@/context/LightDarkModeContext";

export default function Layout() {
  const { theme } = useThemeContext();

  return (
    <div className={`theme--${theme}-hf h-screen flex flex-col`}>
      <div>
        <Header />
      </div>

      <main className={`flex-1 p-3 bg-[#F6F7F9] ${`theme--${theme}-bg`}`}>
        <Outlet />
      </main>

      <div>
        <Footer />
      </div>
    </div>
  );
}
