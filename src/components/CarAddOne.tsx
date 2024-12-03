import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function CarAddOne() {
  return (
    <div
      className={`text-white h-80	rounded-md bg-[url('/img/Background-Ads1.png')] bg-no-repeat z-0 p-10 `}
    >
      <h2 className="text-3xl w-3/5	">The Best Platform for Car Rental</h2>
      <p className="my-5 w-2/3	">
        Providing cheap car rental services and safe and comfortable facilities.
      </p>
      <Button className="bg-[#3563E9] my-5">
        <Link to="/details/16d32f41-715b-4738-b306-8ebb138c8bc0">
          Rental Car
        </Link>
      </Button>
      <img
        src="/img/autoAdd1.png"
        alt=""
        className="-mt-16 pl-6 w-3/4 slide-right"
      />
    </div>
  );
}
