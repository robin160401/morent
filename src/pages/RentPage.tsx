import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useThemeContext } from "@/context/LightDarkModeContext";
import { useUserContext } from "@/context/userContext";
import { supabase } from "@/lib/supabase";
import { QueryData } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function RentPage() {
	const { theme } = useThemeContext();
	const { id } = useParams();
	const [vehicle, setVehicle] = useState<VehicleData | null>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const telRef = useRef<HTMLInputElement>(null);
	const addressRef = useRef<HTMLInputElement>(null);
	const townRef = useRef<HTMLInputElement>(null);
	const pickUpLocationRef = useRef<HTMLInputElement>(null);
	const pickUpDateRef = useRef<HTMLInputElement>(null);
	const pickUpTimeRef = useRef<HTMLInputElement>(null);
	const dropOffLocationRef = useRef<HTMLInputElement>(null);
	const dropOffDateRef = useRef<HTMLInputElement>(null);
	const dropOffTimeRef = useRef<HTMLInputElement>(null);
	const { user } = useUserContext();
	

	const getVehicle = async () => {
		const result = await supabase.from("vehicles").select("*").eq("id", id!).single();
		return result;
	}

	const insertBooking = async () => {
		if (user && vehicle) {
		  const bookingData = {
			user_id: user.id,
			vehicle_id: vehicle.id,
			pick_up_location: pickUpLocationRef.current?.value,
			pick_up_date: pickUpDateRef.current?.value,
			drop_off_location: dropOffLocationRef.current?.value,
			drop_off_date: dropOffDateRef.current?.value,
		  };
		  await supabase.from("bookings").insert([bookingData]);
		}
	  };

	const handleButton = () => {
		insertBooking();
	}

	useEffect(() => {
		if (id)
			getVehicle().then((vehicle) => setVehicle(vehicle.data));
	  }, [id]);
	

	type VehicleData = QueryData<ReturnType<typeof getVehicle>>;
	console.log(id);
  return (
	<div className="mb-10">
		<section className="flex mb-10">
			<form className={`inset-y-0 left-0  rounded-lg theme--${theme}-card w-2/3`}>
				<div className="bg bg-white mr-8 p-5 rounded-lg">
					<div className="flex justify-between mb-3">
						<div>
							<h2 className="text-2xl font-medium">Billing Info</h2>
							<p className="text-sm text-[#7D8CA0] font-light">Please enter your billing info</p>
						</div>
						<p className="text-[#90A3BF] text-sm">Step 1 of 4</p>
					</div>
					<div className="grid grid-cols-2 gap-3 font-light">
						<div>
							<label htmlFor="Name">Name</label>
							<Input
								id="Name"
								type="text"
								placeholder="Your name"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={nameRef}
							/>
						</div>
						<div>
							<label htmlFor="Tel">Phone number</label>
							<Input
								id="Tel"
								type="text"
								placeholder="Phone number"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={telRef}
							/>
						</div>
						<div>
							<label htmlFor="Address">Address</label>
							<Input
								id="Address"
								type="text"
								placeholder="Address"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={addressRef}
							/>
						</div>
						<div>
							<label htmlFor="Town">Town / City</label>
							<Input
								id="Town"
								type="text"
								placeholder="Town or City"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={townRef}
							/>
						</div>
					</div>
				</div>
				<div className="bg-white mr-8 p-5 rounded-lg mt-10">
					<div className="flex justify-between items-center mb-3">
						<div>
							<h2 className="text-2xl font-medium">Rental Info</h2>
							<p className="text-[#7D8CA0] text-sm font-light">Please select your rental date</p>
						</div>
						<p className="text-[#90A3BF] text-sm">Step 2 of 4</p>
					</div>
					<p className="mb-3">Pick - Up</p>
					<div className="grid grid-cols-2 gap-3 font-light">
						<div>
							<label htmlFor="Locations">Locations</label>
							<Input
								id="Locations"
								type="text"
								placeholder="Town or City"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={pickUpLocationRef}
							/>
						</div>
						<div>
							<label htmlFor="Town">Date</label>
							<Input
								id="Date"
								type="date"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={pickUpDateRef}
							/>
						</div>
						<div>
							<label htmlFor="Time">Time</label>
							<Input
								id="Time"
								type="time"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={pickUpTimeRef}
							/>
						</div>
					</div>
					<p className="mt-6 pt-3 border-t-2 mb-3">Drop - Off</p>
					<div className="grid grid-cols-2 gap-3 font-light">
						<div>
							<label htmlFor="Locations">Locations</label>
							<Input
								id="Locations"
								type="text"
								placeholder="Town or City"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={dropOffLocationRef}
							/>
						</div>
						<div>
							<label htmlFor="Date">Date</label>
							<Input
								id="Date"
								type="date"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={dropOffDateRef}
							/>
						</div>
						<div>
							<label htmlFor="Time">Time</label>
							<Input
								id="Time"
								type="time"
								className="pr-60 rounded-md bg-[#F6F7F9]"
								ref={dropOffTimeRef}
							/>
						</div>
					</div>
				</div>
				<div className="bg bg-white mr-8 p-5 rounded-lg mt-10">
					<div className="flex justify-between mb-3">
						<div>
							<h2 className="text-2xl font-medium">Payment Method</h2>
							<p className="text-sm text-[#7D8CA0] font-light">Please enter your payment method</p>
						</div>
						<p className="text-[#90A3BF] text-sm">Step 3 of 4</p>
					</div>
					<div className="">
						<div className="mt-3">
							<div className="pr-60 rounded-md bg-[#F6F7F9] h-10 flex items-center">
								<div className="flex items-center">
									<input className="ml-5" type="radio"/>
									<p className="ml-3 text-sm">Credit Card</p>
								</div>
							</div>
						</div>
						<div className="mt-3">
							<div className="pr-60 rounded-md bg-[#F6F7F9] h-10 flex items-center">
								<div className="flex items-center">
									<input className="ml-5" type="radio"/>
									<p className="ml-3 text-sm">Paypal</p>
								</div>
							</div>
						</div>
						<div className="mt-3">
							<div className="pr-60 rounded-md bg-[#F6F7F9] h-10 flex items-center">
								<div className="flex items-center">
									<input className="ml-5" type="radio"/>
									<p className="ml-3 text-sm">Bitcoin</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg bg-white mr-8 p-5 rounded-lg mt-10">
					<div className="flex justify-between mb-3">
						<div>
							<h2 className="text-2xl font-medium">Confirmation</h2>
							<p className="text-sm text-[#7D8CA0] font-light">We are getting tot he end. Just a few clicks and your rental is ready!</p>
						</div>
						<p className="text-[#90A3BF] text-sm">Step 4 of 4</p>
					</div>
					<div className="">
						<div className="mt-3">
							<div className="pr-60 rounded-md bg-[#F6F7F9] h-10 flex items-center">
								<div className="flex items-center">
									<input className="ml-5" type="checkbox" />
									<p className="ml-3 text-xs">I agree withs ending marketing and newsletter emails. No spam, promised!</p>
								</div>
							</div>
						</div>
						<div className="mt-3">
							<div className="pr-60 rounded-md bg-[#F6F7F9] h-10 flex items-center">
								<div className="flex items-center">
									<input className="ml-5" type="checkbox" />
									<p className="ml-3 text-xs">I agree with our terms and conditions and privacy policy</p>
								</div>
							</div>
						</div>
					</div>
					<p className="text-xs text-[#7D8CA0] mt-6">All your data is safe</p>
					<p className="text-xs text-[#7D8CA0]">We are using the most advanced security to provide you the best experience ever.</p>
				</div>
				<Link to="/bookings">
					<Button onClick={handleButton} className="mt-12">Rent now!</Button>
				</Link>
			</form>
			<div className="w-1/3">
				<div className="bg-white p-5 rounded-md">
					<h2 className="text-xl font-medium mb-1">Rental Summary</h2>
					<p className="text-sm font-light text-[#7D8CA0]">Prices may change depending on the length of the rental and the price of your rental car.</p>
					<div>
						<img src={vehicle?.carImg} alt="" className="rounded-lg mt-5"/>
						<div>
							<p className="font-medium text-md mt-5">{`${vehicle?.brand} ${vehicle?.model}`}</p>
							<div>
								reviews, number of reviews
							</div>
						</div>
						<div className="flex justify-between border-t mt-6 pt-5 text-sm font-light">
							<p className="">Price per Day</p>
							<p>{`${vehicle?.pricePerDay} $`}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
  );
}
