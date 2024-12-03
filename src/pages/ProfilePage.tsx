
import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/context/LightDarkModeContext";
import { useUserContext } from "@/context/userContext";
import { /* getStorageURL, */ supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string | null;
}

export default function ProfilePage() {
  const { theme } = useThemeContext();
  const { user } = useUserContext();
  const [profile, setProfile] = useState<Profile>();


  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error loading user profile:", error);
        } else {
          setProfile(data);
          return data;
        }
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);
  
  return (
    <div
      className={`w-96 p-3 bg-white shadow-sm ${`theme--${theme}-card`} flex flex-col gap-5 m-auto p-8 rounded-lg`}
    >
      <h2 className="font-semibold text-2xl text-center mb-7">My Profile</h2>
      <p>
        <span className="font-semibold ">First Name:</span>{" "}
        {profile?.first_name}
      </p>
      <p>
        <span className="font-semibold ">Last Name: </span> {profile?.last_name}
      </p>
      <p>
        <span className="font-semibold ">Email: </span> {user?.email}
      </p>
      <div>
        <Link to={`/favorites/${user!.id}`}>
          <Button className="bg-[#3563E9] m-2">Your Favorites</Button>
        </Link>
        <Link to={`/bookings`}>
          <Button className="bg-[#3563E9] m-2">Your Bookings</Button>
        </Link>
      </div>
      </div>
  );
}
