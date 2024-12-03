import tankIcon from "/img/icons/tank-icon.svg";
import typeIcon from "/img/icons/lenkrad-icon.svg";
import seatsIcon from "/img/icons/personen-haben-gemietet-icon.svg";
import redHeartIcon from "/img/icons/heart-red-icon.svg";
import whiteHeartIcon from "/img/icons/heart-outline-white.svg";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useThemeContext } from "@/context/LightDarkModeContext";
import { supabase } from "@/lib/supabase";
import { useUserContext } from "@/context/userContext";

export interface CarCardProps {
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
	isFavorited: boolean;
	onFavoritteClick: () => void;
}

export default function CarCard(props: CarCardProps) {
	const { theme } = useThemeContext();
	const { user } = useUserContext();

	const handleFavorite = async () => {
		if (user ){
			if (!props.isFavorited){
				await supabase
				.from("favorites")
				.insert([{user_id: user.id, vehicle_id: props.vehicle.id,}]);
			} else {
				await supabase
				.from("favorites")
				.delete()
				.eq("user_id", user.id)
				.eq("vehicle_id", props.vehicle.id);
			}
			if (props.onFavoritteClick) props.onFavoritteClick();
		}
	};


  return (
    <div className={`p-3 bg-white rounded-lg theme--${theme}-card`}>
      <div className="flex justify-between">
        <h2
          className={`font-bold mb-2 mx-2 `}
        >{`${props.vehicle.brand} ${props.vehicle.model}`}</h2>
        <div>
          <img className="hover:h-7" src={props.isFavorited ? redHeartIcon : whiteHeartIcon} alt="favorited" onClick={handleFavorite}/>
        </div>
      </div>
      <p className="text-xs font-semibold text-[#90A3BF] mb-1 mx-2">
        {props.vehicle.vehicleType}
      </p>
      <img className="rounded-xl mb-4" src={props.vehicle.carImg} alt="Car Image" />
      <div className="flex justify-between mb-6">
        <div className="flex">
          <img src={tankIcon} alt="tank-l-pro-100km" />
          <p className="text-[#6C757D] font-light text-sm self-center">
            {props.vehicle.consumption}
          </p>
        </div>
        <div className="flex">
          <img src={typeIcon} alt="type-icon" />
          <p className="text-[#6C757D] font-light text-sm self-center">
            {props.vehicle.gearType}
          </p>
        </div>
        <div className="flex">
          <img src={seatsIcon} alt="how many people" />
          <p className="text-[#6C757D] font-light text-sm self-center">
            {props.vehicle.seats}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold">
          {`${props.vehicle.pricePerDay}/`}
          <span className="text-xs text-[#90A3BF]">day</span>
        </h2>
        <Link to={`/details/${props.vehicle.id}`}>
          <Button className="bg-[#3563E9]">Rent now</Button>
        </Link>
      </div>
    </div>
  );
}