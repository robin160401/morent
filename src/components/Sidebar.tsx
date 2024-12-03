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
      </div>
      <div className="flex">
        <input type="checkbox" onChange={handleCheckboxChange(setFilterSUV)} />
        <p className="ml-2">SUV</p>
      </div>
      <div className="flex">
        <input type="checkbox" onChange={handleCheckboxChange(setFilterMPV)} />
        <p className="ml-2">MPV</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilterSedan)}
        />
        <p className="ml-2">Sedan</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilterCoupe)}
        />
        <p className="ml-2">Electric Car</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilterHatchback)}
        />
        <p className="ml-2">Hatchback</p>
      </div>

      <p className="text-xs text-[#90A3BF] my-6">CAPACITY</p>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilter2Seats)}
        />
        <p className="ml-2">2 Seats</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilter4Seats)}
        />
        <p className="ml-2">4 Seats</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilter5Seats)}
        />
        <p className="ml-2">5 Seats</p>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          onChange={handleCheckboxChange(setFilter7Seats)}
        />
        <p className="ml-2">7 Seats</p>
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
