import { useFilter } from "@/context/filterContext";
// import { useState } from "react";

export default function Sidebar() {
  const {
    setFilter2Seats,
    setFilter4Seats,
    setFilter5Seats,
    setFilter7Seats,
    setFilterCoupe,
    setFilterSUV,
    setFilterSedan,
    setFilterSport,
    setFilterHatchback,
    setFilterMPV,
    setFilterByPriceRange,
  } = useFilter();

  const { filteByPriceRange } = useFilter();

  const availableSportsCars = 0;
  const availableSUVCars = 0;
  const availableMPVCars = 0;
  const availableSedanCars = 0;
  const availableCoupeCars = 0;
  const availableHatchbackCars = 0;
  const available2PersonCars = 0;
  const available4PersonCars = 0;
  const available6PersonCars = 0;
  const available8OrMorePersonCars = 0;

  const highestPrice = 350;

  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) setter(true);
      else setter(false);
    };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByPriceRange(Number(e.target.value));
  };

  return (
    <form action="" className=" w-1/6 bg-white h-screen sticky top-0 p-4 -ml-4 -mt-4 ">
      <p className="text-xs text-[#90A3BF] my-6">TYPE</p>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilterSport)}
        />
        <p className="ml-2">Sport</p>
        <p className="text-[#90A3BF] ml-1">{`(${availableSportsCars})`}</p>
      </div>
      <div className="flex">
        <input type="checkbox" onChange={handleCheckboxChange(setFilterSUV)} />
        <p className="ml-2">SUV</p>
        <p className="text-[#90A3BF] ml-1">{`(${availableSUVCars})`}</p>
      </div>
      <div className="flex">
        <input type="checkbox" onChange={handleCheckboxChange(setFilterMPV)} />
        <p className="ml-2">MPV</p>
        <p className="text-[#90A3BF] ml-1">{`(${availableMPVCars})`}</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilterSedan)}
        />
        <p className="ml-2">Sedan</p>
        <p className="text-[#90A3BF] ml-1">{`(${availableSedanCars})`}</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilterCoupe)}
        />
        <p className="ml-2">Electric Car</p>
        <p className="text-[#90A3BF] ml-1">{`(${availableCoupeCars})`}</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilterHatchback)}
        />
        <p className="ml-2">Hatchback</p>
        <p className="text-[#90A3BF] ml-1">{`(${availableHatchbackCars})`}</p>
      </div>

      <p className="text-xs text-[#90A3BF] my-6">CAPACITY</p>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilter2Seats)}
        />
        <p className="ml-2">2 Seats</p>
        <p className="text-[#90A3BF] ml-1">{`(${available2PersonCars})`}</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilter4Seats)}
        />
        <p className="ml-2">4 Seats</p>
        <p className="text-[#90A3BF] ml-1">{`(${available4PersonCars})`}</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilter5Seats)}
        />
        <p className="ml-2">5 Seats</p>
        <p className="text-[#90A3BF] ml-1">{`(${available6PersonCars})`}</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilter7Seats)}
        />
        <p className="ml-2">7 Seats</p>
        <p className="text-[#90A3BF] ml-1">{`(${available8OrMorePersonCars})`}</p>
      </div>

      <p className="text-xs text-[#90A3BF] my-6">PRICE</p>
      <input
        type="range"
        min="0"
        max={highestPrice}
        value={filteByPriceRange.toString()}
        onChange={handlePriceChange}
      />
      <p className="text-[#6C757D]">{`Max. $${filteByPriceRange}`}</p>
    </form>
  );
}
