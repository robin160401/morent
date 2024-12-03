import CarBookedCard from "@/components/CarBookedCard";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookingPage() {
    const [bookingData, setBookingData] = useState<BookingsData | null>(null);
    const [showPastBookings, setShowPastBookings] = useState(false);
    const { user } = useUserContext();

    const getBookingData = async () => {
        if (!user) return;
        const result = await supabase
            .from("bookings")
            .select("*, vehicles(*)")
            .eq("user_id", user.id);
        setBookingData(result.data);
		return result.data;
    };

        const currentDate = new Date().toISOString().split("T")[0];
        const upcoming = bookingData?.filter((booking) => booking.pick_up_date >= currentDate);
        const past = bookingData?.filter((booking) => booking.pick_up_date < currentDate);
        const upcomingBookings = upcoming?.sort((a, b) => a.pick_up_date.localeCompare(b.pick_up_date));
        const pastBookings = past?.sort((a, b) => b.pick_up_date.localeCompare(a.pick_up_date));

    useEffect(() => {
        getBookingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    type BookingsData = Awaited<ReturnType<typeof getBookingData>>;

	if (!user) {
		return (
		  <div className="w-96 bg-white shadow-sm flex flex-col gap-5 m-auto p-8 rounded-lg items-center mt-20">
			<h2 className="font-semibold text-2xl text-center mb-7">Please Login</h2>
			<p className="text-center">You're not looged in. Please Login to view your bookings.</p>
			<Link to="/login">
			  <Button className="bg-[#3563E9] m-2">go to Login Page</Button>
			</Link>
		  </div>
		);
	  }
	  

    return (
        <section className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold border-b-2 pb-7 border-black text-center mt-10 w-11/12">
                My Bookings
            </h2>
            <div className="flex justify-between border-black border mt-10 w-1/5 rounded-full">
                <p
                    onClick={() => setShowPastBookings(false)}
                    className={`${
                        !showPastBookings ? "bg-white shadow-sm" : "bg-[#F6F7F9]"
                    } rounded-full w-1/2 text-center m-1 cursor-pointer`}>
                    Upcoming
                </p>
                <p
                    onClick={() => setShowPastBookings(true)}
                    className={`${
                        showPastBookings ? "bg-white shadow-sm" : "bg-[#F6F7F9]"
                    } rounded-full w-1/2 text-center m-1 cursor-pointer`}>
                    History
                </p>
            </div>
            <div className="flex flex-col items-center mt-5">
                {showPastBookings
                    ? pastBookings?.map((el) => (
                          <CarBookedCard
                              key={el.id}
                              vehicle={el.vehicles!}
                              id={el.id}
                              user_id={user!.id}
                              pick_up_location={el.pick_up_location}
                              pick_up_date={el.pick_up_date.replace(/-/g, ".")}
                              drop_off_date={el.drop_off_date.replace(/-/g, ".")}
                              drop_off_location={el.drop_off_location}
                          />
                      ))
                    : upcomingBookings?.map((el) => (
                          <CarBookedCard
                              key={el.id}
                              vehicle={el.vehicles!}
                              id={el.id}
                              user_id={user!.id}
                              pick_up_location={el.pick_up_location}
                              pick_up_date={el.pick_up_date.replace(/-/g, ".")}
                              drop_off_date={el.drop_off_date.replace(/-/g, ".")}
                              drop_off_location={el.drop_off_location}
                          />
                      ))}
            </div>
        </section>
    );
}
