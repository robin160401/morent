import { useUserContext } from "@/context/userContext";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useThemeContext } from "@/context/LightDarkModeContext";

export default function LoginPage() {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);
      navigate("/");
    }
  };
  return (
    <section className="sm:w-screen flex justify-center ">
      <div className={` w-96 p-3 bg-white shadow-sm ${`theme--${theme}-card`} rounded-lg flex flex-col items-center justify-center m-8 `}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <h1 className="font-semibold text-2xl text-center mb-7">Login</h1>
          <Input
            className="rounded-full"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="rounded-full"
            type="password"
            placeholder="passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <Button className="bg-[#3563E9] w-full">Sign in</Button>
        </form>
        <p className="mt-5">
          No Account? Register
          <Button asChild variant="ghost">
            {!user && <NavLink to="/sign-up">Here</NavLink>}
          </Button>
        </p>
      </div>
    </section>
  );
}
