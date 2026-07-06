import { useState, useEffect, useRef } from "react";
import { fetchLocationSuggestions } from "@/app/(player)/services/LocationIQ";
import { CleanLocation, LocationIQResult } from "@/app/(player)/components/SearchBar/SearchBarData";


export function LocationSearchHook() {
  const [query, setQuery] = useState("");
  // Fix the 'never' error by adding the Type here
  const [suggestions, setSuggestions] = useState<LocationIQResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<CleanLocation | null>(null);

  const isManualSelection = useRef(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (isManualSelection.current) {
        isManualSelection.current = false;
        return;
      }

      if (query.length >= 3) {
        setIsLoading(true);
        try {
          const data = await fetchLocationSuggestions(query);
          setSuggestions(data);
        } catch (error) {
          console.error("Search Error:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);


  const selectLocation = (item: LocationIQResult): CleanLocation => {
    isManualSelection.current = true;
    
    const locationObject: CleanLocation = {
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      raw: item
    };

    setSelectedLocation(locationObject);
    setQuery(item.display_name);
    setSuggestions([]);

    return locationObject;
  };

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    selectedLocation,
    selectLocation
  };
}