import { useThemeContext } from "@/context/LightDarkModeContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { theme } = useThemeContext();

  return (
    <footer className={`p-5 theme--${theme}-hf`}>
      <section className="flex justify-between px-4">
        <div className="w-auto">
          <h2 className="logo text-3xl">MORENT</h2>
          <p className="text-sm">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>
        <div className="flex space-x-20">
          <div className="flex flex-col text-sm">
            <h4 className="font-bold text-base">About Us</h4>
            <Link to="/">How it works</Link>
            <Link to="/">Featured</Link>
            <Link to="/">Partnership</Link>
            <Link to="/">Business Relation</Link>
          </div>
          <div className="flex flex-col text-sm">
            <h4 className="font-bold text-base">Community</h4>
            <Link to="/">Events</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Podcast</Link>
            <Link to="/">Invite a friend</Link>
          </div>
          <div className="flex flex-col text-sm">
            <h4 className="font-bold text-base">Socials</h4>
            <a href="https://discord.com/">
              <p>Discord</p>
            </a>
            <a href="www.instagram.com">
              <p>Instagram</p>
            </a>
            <a href="https://x.com/">
              <p>Twitter</p>
            </a>
            <a href="www.facebook.com">
              <p>Facebook</p>
            </a>
          </div>
        </div>
      </section>
      <div className="flex text-xs items-center justify-between w-screen border-t-2 mt-3 pl-2 pr-2">
        <p>©2024 MORENT. All rights reserved</p>
        <p>Privacy & Policy</p>
        <p>Terms & Condition</p>
      </div>
    </footer>
  );
}
