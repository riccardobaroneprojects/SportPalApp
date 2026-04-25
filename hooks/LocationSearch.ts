import { useState, useEffect, useRef } from "react";
import { fetchLocationSuggestions } from "@/lib/LocationIQ";
import { useMapContext } from "@/context/MapContext";

export function useLocationSearch() {

const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [selectedLocation, setSelectedLocation] = useState<{lat: number, lon: number} | null>(null);

const { setMapCenter } = useMapContext();

const isManualSelection = useRef(false);
const timeoutRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
    
        if (isManualSelection.current) {
            isManualSelection.current = false; // Reset it for the next type
            return;
        }

        if (query.length >= 3) {
            setIsLoading(true);
            try {
                const data = await fetchLocationSuggestions(query);
                setSuggestions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setSuggestions([]);
        }
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const selectLocation = (item: any) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    isManualSelection.current = true;
    const coords = {
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    };
    setMapCenter(coords);
    setSelectedLocation(coords);
    setQuery(item.display_name);
    setSuggestions([]);  
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