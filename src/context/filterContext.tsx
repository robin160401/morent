import { createContext, ReactNode, useContext, useState } from "react";

interface FilterContext {
	available2SeatsCars: number
    available4SeatsCars: number
    available5SeatsCars: number
    available7SeatsCars: number
	availableSportsCars: number;
	availableSUVs: number;
	availableMPVs: number;
	availableElectricCars: number;
	availableSedans: number;
	availableHatchbacks: number;
	availableCoupes: number;
	filterSport: boolean;
	filterSUV: boolean;
	filterMPV: boolean;
	filterSedan: boolean;
	filterCoupe: boolean;
	filterHatchback: boolean;
	filter2Seats: boolean;
	filter4Seats: boolean;
	filter7Seats: boolean;
	filter5Seats: boolean;
	filteByPriceRange: number;
	setFilterSport: (term: boolean) => void;
	setFilterSUV: (term: boolean) => void;
	setFilterMPV: (term: boolean) => void;
	setFilterSedan: (term: boolean) => void;
	setFilterCoupe: (term: boolean) => void;
	setFilterHatchback: (term: boolean) => void;
	setFilter2Seats: (term: boolean) => void;
	setFilter4Seats: (term: boolean) => void;
	setFilter5Seats: (term: boolean) => void;
	setFilter7Seats: (term: boolean) => void;
	setFilterByPriceRange: (term: number) => void;
	setAvailableSportsCars: (term: number) => void;
	setAvailableSUVs: (term: number) => void;
	setAvailableMPVs: (term: number) => void;
	setAvailableSedans: (term: number) => void;
	setAvailableCoupes: (term: number) => void;
	setAvailableElectricCars: (term: number) => void;
	setAvailableHatchbacks: (term: number) => void;
	setAvailable2SeatsCars: (term: number) => void;
    setAvailable4SeatsCars: (term: number) => void;
    setAvailable5SeatsCars: (term: number) => void;
    setAvailable7SeatsCars: (term: number) => void;
}

const FilterContext = createContext<FilterContext | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filterSport, setFilterSport] = useState(false);
  const [filterSUV, setFilterSUV] = useState(false);
  const [filterMPV, setFilterMPV] = useState(false);
  const [filterSedan, setFilterSedan] = useState(false);
  const [filterCoupe, setFilterCoupe] = useState(false);
  const [filterHatchback, setFilterHatchback] = useState(false);
  const [filter2Seats, setFilter2Seats] = useState(false);
  const [filter4Seats, setFilter4Seats] = useState(false);
  const [filter5Seats, setFilter5Seats] = useState(false);
  const [filter7Seats, setFilter7Seats] = useState(false);
  const [filteByPriceRange, setFilterByPriceRange] = useState(0);
  const [available2SeatsCars, setAvailable2SeatsCars] = useState(0);
  const [available4SeatsCars, setAvailable4SeatsCars] = useState(0);
  const [available5SeatsCars, setAvailable5SeatsCars] = useState(0);
  const [available7SeatsCars, setAvailable7SeatsCars] = useState(0);
  const [availableCoupes, setAvailableCoupes] = useState(0);
  const [availableSportsCars, setAvailableSportsCars] = useState(0);
  const [availableSUVs, setAvailableSUVs] = useState(0);
  const [availableHatchbacks, setAvailableHatchbacks] = useState(0);
  const [availableElectricCars, setAvailableElectricCars] = useState(0);
  const [availableSedans, setAvailableSedans] = useState(0);
  const [availableMPVs, setAvailableMPVs] = useState(0);

  return (
    <FilterContext.Provider value={{filterSport, filterSUV, filterMPV, filterSedan, filterCoupe,
		filterHatchback, filter2Seats, filter4Seats, filter5Seats, filter7Seats, filteByPriceRange,
		availableSportsCars, availableSUVs, availableMPVs,availableElectricCars,availableSedans, availableCoupes,
		availableHatchbacks, available2SeatsCars, available4SeatsCars, available5SeatsCars, available7SeatsCars, setAvailableCoupes,
		setFilter2Seats, setFilter4Seats, setFilter5Seats, setFilter7Seats,
		setFilterCoupe, setFilterHatchback, setFilterMPV, setFilterSedan, setFilterSport, setFilterSUV,
		setFilterByPriceRange, setAvailable2SeatsCars, setAvailable4SeatsCars, setAvailable5SeatsCars, setAvailable7SeatsCars,
		setAvailableSportsCars,
		setAvailableSUVs,
		setAvailableMPVs,
		setAvailableSedans,
		setAvailableElectricCars,
		setAvailableHatchbacks
	}}>
      {children}
    </FilterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("failed");
  }
  return context;
};