import { useThemeContext } from "@/context/LightDarkModeContext";
import { Button } from "./ui/button";

export default function LightDarkThemeSwitcher() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <Button
      variant={"outline"}
      className="rounded-full h-14  mx-2"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <img
          src="/img/icons/sun-lightmode-icon.svg"
          alt="lightmode"
          className="L-D-Mode"
        />
      ) : (
        <img
          src="/img/icons/sun-darkmode-icon.svg"
          alt="darkmode"
          className="L-D-Mode"
        />
      )}
    </Button>
  );
}
