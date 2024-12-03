import svg from "../assets/svg/SVG (3).png"

interface CarBookedCard {
  id: string;
  vehicle: {
    id: string;
    brand: string;
    carImg: string;
    model: string;
    vehicleType: string;
    year: number;
    pricePerDay: number;
    seats: number;
    consumption: string;
    gearType: string;
  };
  user_id: string;
  pick_up_location: string;
  pick_up_date: string;
  drop_off_location: string;
  drop_off_date: string;
}

export default function CarBookedCard(props: CarBookedCard) {

	const calculateDaysBetweenDates = (startDate: string, endDate: string): number => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const differenceInMilliseconds = end.getTime() - start.getTime();
		const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 3600 * 24));
		return differenceInDays;
	  };
	  
	const days = calculateDaysBetweenDates(props.pick_up_date, props.drop_off_date);
  
  return (
    <div className="w-11/12 mb-10">
      <p className="text-xl font-semibold mb-5 mt-7">{props.pick_up_date}</p>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex border-b p-7">
          <img className="w-1/6 rounded-md" src={props.vehicle.carImg} alt="" />
          <div className="ml-4">
            <p className="text-xl">{`${props.vehicle.brand} ${props.vehicle.model}`}</p>
            <p className="text-[#90A3BF]">{`${props.pick_up_date} - ${props.drop_off_date}`}</p>
            <p className="text-xl">{`$ ${props.vehicle.pricePerDay * (days + 1)}`}</p>
          </div>
        </div>
        <div>
          <div className="flex p-10">
            <div>
              <img className="" src={svg} alt="" />
            </div>
            <div className="">
              <p className="text-xl text-[#6C757D] m-2 -mt-1 mb-3">{props.pick_up_location}</p>
              <p className="text-xl text-[#6C757D] m-2">{props.drop_off_location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

