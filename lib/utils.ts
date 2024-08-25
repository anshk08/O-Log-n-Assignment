// lib/index.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string;

export async function getLocalityData(localityId: string) {
  // Fetch weather data from the API
  const weatherResponse = await fetch(
    `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
    {
      method: "GET",
      headers: {
        "X-Zomato-Api-Key": API_KEY,
      },
    }
  );
  const weatherData = await weatherResponse.json();

  // Fetch locality data from JSON file
  const localitiesResponse = await fetch("/localities.json");
  const localities: { locality_name: string; locality_id: string }[] =
    await localitiesResponse.json();

  // Find the locality name from the JSON file
  const locality = localities.find((loc) => loc.locality_id === localityId);

  return {
    weather: weatherData.locality_weather_data,
    locality_name: locality ? locality.locality_name : "Unknown Locality",
  };
}
