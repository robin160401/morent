import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { QueryData } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import tankIcon from "/img/icons/tank-icon.svg";
import typeIcon from "/img/icons/lenkrad-icon.svg";
import seatsIcon from "/img/icons/personen-haben-gemietet-icon.svg";
import Map from "@/components/Map";
import { useThemeContext } from "@/context/LightDarkModeContext";

export default function DetailsPage() {
  const { theme } = useThemeContext();
  const { id } = useParams();
  const [car, setCar] = useState<CarData | null>(null);

  const getCar = async (id: string) => {
    const result = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single();
    return result;
  };
  type CarData = QueryData<ReturnType<typeof getCar>>;

  useEffect(
    () => {
      if (id) {
        getCar(id).then((result) => setCar(result.data));
      }
    } /* eslint-disable */,
    [] /* eslint-enable */
  );

  if (!car) {
    return <div className="loader pl-11 p-2.5"></div>;
  }

  return (
    <section className="flex flex-wrap justify-center lg:flex flex-col">
      <div className="grid grid-rows-3 p-20 gap-8 lg:grid-cols-3 lg:grid-rows-1 lg:p-10">
        <div className=" w-auto h-80 bg-white ${`theme--${theme}-bg`} rounded-xl ml-5">
          <img
            className="rounded-xl object-cover w-full h-full"
            src={car.carImg}
            alt="Car Image"
          />
        </div>
        <div
          className={` h-80 p-3 grid grid-rows w-full gap-6 bg-white shadow-sm ${`theme--${theme}-card`} rounded-xl`}
        >
          <div>
            <h2 className={`font-bold mb-2 mx-2 `}>
              {car.brand} {car.model} ({car.year})
            </h2>
            <p className="text-xs font-semibold text-[#90A3BF] mb-1 mx-2">
              {car.vehicleType}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex gap-14 items-center">
              <div className="flex gap-1">
                <img src={tankIcon} alt="fuel" />
                <p className="text-[#62707c] font-medium text- self-center">
                  Fuel:
                </p>
              </div>
              <div>
                <p className="text-[#6C757D] font-light text-sm self-center">
                  {car.fuel}
                </p>
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex gap-1">
                <img src={tankIcon} alt="tank-l-pro-100km" />
                <p className="text-[#62707c] font-medium text- self-center">
                  Consumption:
                </p>
              </div>
              <p className="text-[#6C757D] font-light text-sm self-center">
                {car.consumption} L
              </p>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex gap-1">
                <img src={typeIcon} alt="type-icon" />
                <p className="text-[#62707c] font-medium text- self-center">
                  Gear:
                </p>
              </div>
              <div>
                <p className="text-[#6C757D] font-light text-sm self-center">
                  {car.gearType}
                </p>
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex gap-1">
                <img src={seatsIcon} alt="how many people" />
                <p className="text-[#62707c] font-medium text- self-center">
                  Seats:
                </p>
              </div>
              <div>
                <p className="text-[#6C757D] font-light text-sm self-center">
                  {car.seats} Persons
                </p>
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex gap-1">
                <img src={seatsIcon} alt="how many people" />
                <p className="text-[#62707c] font-medium text- self-center">
                  Luggage:
                </p>
              </div>
              <div>
                <p className="text-[#6C757D] font-light text-sm self-center">
                  {car.luggage}
                </p>
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex gap-1">
                <img src={seatsIcon} alt="how many people" />
                <p className="text-[#62707c] font-medium text- self-center">
                  Color:
                </p>
              </div>
              <div>
                <p className="text-[#6C757D] font-light text-sm self-center">
                  {car.colors}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="font-bold">
              {`${car.pricePerDay}/`}
              <span className="text-xs text-[#90A3BF]">day</span>
            </h2>
            <Link to={`/rent/${car.id}`}>
              <Button className="bg-[#3563E9]">Rent now</Button>
            </Link>
          </div>
        </div>
        <Map></Map>
      </div>
    </section>
  );
}
