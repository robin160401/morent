import CarAddOne from "@/components/CarAddOne";
import CarAddTwo from "@/components/CarAddTow";
import CarCard from "@/components/CarCard";
import { supabase } from "@/lib/supabase";
import { QueryData } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { useSearch } from "@/context/searchContext";
import { useFilter } from "@/context/filterContext";
import { useThemeContext } from "@/context/LightDarkModeContext";

export default function HomePage() {
  const { theme } = useThemeContext();
  const [vehiclesData, setVehiclesData] = useState<VehicleData | null>(null);
  const [locationsData, setLocationsData] = useState<LocationsData | null>(
    null
  );
  const [reload, setReload] = useState(false);
  const { searchFor } = useSearch();
  const [locationsFilter, setLocationsFilter] = useState("");
  const {
    filter2Seats,
    filter5Seats,
    filter7Seats,
    filter4Seats,
    filterCoupe,
    filterSUV,
    filterSedan,
    filterSport,
    filterHatchback,
    filterMPV,
    filteByPriceRange,
  } = useFilter();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const filtersVehicles = [
    { isActive: filterCoupe, value: "vehicleType.eq.Electric Car" },
    { isActive: filterSUV, value: "vehicleType.eq.SUV" },
    { isActive: filterSedan, value: "vehicleType.eq.Sedan" },
    { isActive: filterSport, value: "vehicleType.eq.Sportscar" },
    { isActive: filterHatchback, value: "vehicleType.eq.Hatchback" },
    { isActive: filterMPV, value: "vehicleType.eq.Van" },
  ];
  const filterSeats = [
    { isActive: filter2Seats, value: "seats.eq.2" },
    { isActive: filter5Seats, value: "seats.eq.5" },
    { isActive: filter7Seats, value: "seats.eq.7" },
    { isActive: filter4Seats, value: "seats.eq.4" },
  ];

  function getFilterVehicles() {
    const filterStrings: string[] = [];
    filtersVehicles.forEach((filter) => {
      if (filter.isActive) {
        filterStrings.push(filter.value);
      } else {
        const index = filterStrings.indexOf(filter.value);
        if (index !== -1) {
          filterStrings.splice(index, 1);
        }
      }
    });
    if (filterStrings.length == 0) {
      filtersVehicles.forEach((filter) => {
        filterStrings.push(filter.value);
      });
      return filterStrings.join(",");
    }
    return filterStrings.join(",");
  }

  function getFilterSeats() {
    const filterStrings: string[] = [];
    filterSeats.forEach((filter) => {
      if (filter.isActive) {
        filterStrings.push(filter.value);
      } else {
        const index = filterStrings.indexOf(filter.value);
        if (index !== -1) {
          filterStrings.splice(index, 1);
        }
      }
    });
    if (filterStrings.length == 0) {
      filterSeats.forEach((filter) => {
        filterStrings.push(filter.value);
      });
      return filterStrings.join(",");
    }
    return filterStrings.join(",");
  }

  const priceRange = () => {
    if (filteByPriceRange == 0) return 350;
    return filteByPriceRange;
  };
  const getVehicles = async () => {
    const result = await supabase
      .from("vehicles")
      .select("*, favorites(*)")
      .ilike("brand", `%${searchFor}%`)
      .or(getFilterVehicles())
      .or(getFilterSeats())
      .lte("pricePerDay", priceRange())
      .ilike("locations", `%${locationsFilter}%`);
    return result;
  };

  const getLocations = async () => {
    const result = await supabase.from("locations").select("*").single();
    return result;
  };

  type VehicleData = QueryData<ReturnType<typeof getVehicles>>;
  type LocationsData = QueryData<ReturnType<typeof getLocations>>;
  const locationsString = locationsData?.locations?.toString();
  const locationsArray = locationsString?.split(",");

  useEffect(
    () => {
      getVehicles().then((result) => setVehiclesData(result.data));
    },
    /* eslint-disable */ [
      reload,
      searchFor,
      filter2Seats,
      filter4Seats,
      filter5Seats,
      filter7Seats,
      filterCoupe,
      filterHatchback,
      filterSUV,
      filterSedan,
      filterSport,
      filterMPV,
      filteByPriceRange,
      locationsFilter,
    ] /* eslint-enable */
  );

  useEffect(() => {
    getLocations().then((locations) => setLocationsData(locations.data));
  }, [searchFor]);

  const handleLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = event.target.value;
    if (selectedLocation === "Please Select") {
      setLocationsFilter("");
      setSidebarVisible(false);
    } else {
      setLocationsFilter(selectedLocation);
    }
    console.log(locationsFilter);
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`bg-[#F6F7F9] flex ${`theme--${theme}-bg`} justify-center`}>
      <div className={`flex ${sidebarVisible ? 'w-full' : 'w-9/12'}`}>
        {sidebarVisible && <Sidebar />}
        <div className={`flex-1 transition-all ${sidebarVisible ? 'ml-5' : 'ml-0'}`}>
          <div className="flex flex-col w-full">
            <div className={`hidden md:flex gap-10 mb-20 flex-col justify-around mt-5 lg:flex-row px-10`}>
              <CarAddOne />
              <CarAddTwo />
            </div>
            <div className={`flex flex-col gap-5 md:mb-10 items-center lg:flex-row justify-center`}>
              <form className={`bg-white rounded-lg shadow-sm p-3`}>
                <h3 className="text-base font-semibold">Pickup</h3>
                <div className="flex">
                  <div>
                    <p className="text-base font-semibold">Location:</p>
                    <select onChange={handleLocation}>
                      <option>Please Select</option>
                      {locationsArray?.map((el: string, index: number) => (
                        <option key={index} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="text-base font-semibold">Date</p>
                    <input type="date" />
                  </div>
                  <div>
                    <p className="text-base font-semibold">Time</p>
                    <input type="time" />
                  </div>
                </div>
              </form>
              <Button size={"lg"} className="bg-[#3563E9]">
                ↑↓
              </Button>
              <form className={`rounded-lg bg-white shadow-sm p-3`}>
                <h3 className="text-base font-semibold">Drop-Off</h3>
                <div className="flex">
                  <div>
                    <p className="text-base font-semibold">Location:</p>
                    <select>
                      <option>Please Select</option>
                      {locationsArray?.map((el: string, index: number) => (
                        <option key={index} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    <p className="text-base font-semibold">Date</p>
                    <input type="date" />
                  </div>
                  <div>
                    <p className="text-base font-semibold">Time</p>
                    <input type="time" />
                  </div>
                </div>
              </form>
            </div>
            <div className="text-right mt-3 mr-20 mb-5">
              <Button
                disabled={!locationsFilter || locationsFilter === "Please Select"}
                className="bg-[#3563E9]"
                onClick={toggleSidebar}
              >
                Filter
              </Button>
            </div>
            <div
              className={`flex flex-col gap-3 md:grid ${
                sidebarVisible ? "xl:grid-cols-3 lg:grid-cols-2" : "xl:grid-cols-4 lg:grid-cols-4"
              } gap-5 mb-10 justify-items-center`}
            >
              {vehiclesData?.map((el) => (
                <CarCard
                  key={el.id}
                  vehicle={el}
                  isFavorited={el.favorites.length > 0}
                  onFavoritteClick={() => setReload(!reload)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}