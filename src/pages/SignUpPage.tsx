import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import imageIcon from "../../public/img/icons/image-upload-icon.svg";
import { useRef, useState } from "react";
import { useUserContext } from "@/context/userContext";
import { supabase } from "@/lib/supabase";
import { useThemeContext } from "@/context/LightDarkModeContext";

export default function SignUpPage() {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserContext();
  const fileRef = useRef<HTMLInputElement>(null);

  console.log(user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
      },
    });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);

      const file = fileRef.current?.files?.[0] || null;

      if (file && result.data.user) {
        const uploadResult = await supabase.storage
          .from("profile_image")
          .upload(`${result.data.user.id}/profile`, file, {
            upsert: true,
          });
        if (uploadResult.data) {
          await supabase
            .from("profiles")
            .update({ image_url: `${uploadResult.data.fullPath}` })
            .eq("id", result.data.user.id);
        }
      }
    }
  };

  return (
    <section className="sm:w-screen flex justify-center">
      <div
        className={`w-96 p-3 bg-white shadow-sm ${`theme--${theme}-card`} rounded-lg flex flex-col items-center justify-center m-8`}
      >
        <h1 className="font-semibold text-2xl text-center mb-7">
          Create a new account
        </h1>
        <div>
          <form className="flex flex-col gap-4 px-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="E-mail">E-mail</label>
              <Input
                className="rounded-full w-4/5"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="" htmlFor="E-mail">
                Password
              </label>
              <Input
                className="rounded-full w-4/5"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="E-mail">First name</label>
              <Input
                className="rounded-full w-4/5"
                type="text"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="E-mail">Last name</label>
              <Input
                className="rounded-full w-4/5"
                type="text"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label>Profile picture</label>
              <Input
                className="rounded-full w-4/5"
                type="file"
                src=""
                alt={` Image-Upload`}
                ref={fileRef}
              />
            </div>
              <Button className="bg-[#3563E9] mt-5 w-full">Sign up</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
