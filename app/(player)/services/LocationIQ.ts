/* called by any location search field,
generally triggered: 
- after 3 characters have been typed
- more than one second has passed since last character was typed

this is intended to act as a location autocomplete feature  */

"use server"

export async function fetchLocationSuggestions(query: string) {
  if (!query || query.length < 3) return [];

  const response = await fetch(
    `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_LOCATIONIQ_TOKEN}&q=${query}&limit=5&dedupe=1&format=json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }

  return response.json();
}