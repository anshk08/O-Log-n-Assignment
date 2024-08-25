"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Autocomplete from "@/components/auto-complete";
import { getLocalityData } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
}

const WeatherDetails: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [localityName, setLocalityName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { localityId } = useParams();

  useEffect(() => {
    if (localityId) {
      const fetchData = async () => {
        try {
          const data = await getLocalityData(localityId as string);
          setWeatherData(data.weather);
          setLocalityName(data.locality_name);
          setError("");
        } catch (err) {
          setWeatherData(null);
          setError("Error fetching weather data");
        }
      };

      fetchData();
    }
  }, [localityId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Autocomplete />
      <div className="text-center mt-8 w-[80vw] md:w-[50vw]">
        {error && <p className="text-red-500">{error}</p>}
        {weatherData ? (
          <div className="p-6 bg-black/20 dark:bg-white/15 rounded-md w-full flex flex-col items-start justify-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {localityName}
            </h2>
            <div className=" flex flex-col items-start">
              <p>Temperature: {weatherData.temperature} °C</p>
              <p>Humidity: {weatherData.humidity} %</p>
              <p>Wind Speed: {weatherData.wind_speed} m/s</p>
              <p>Wind Direction: {weatherData.wind_direction} °</p>
              <p>Rain Intensity: {weatherData.rain_intensity}</p>
              <p>Rain Accumulation: {weatherData.rain_accumulation} mm</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-500 size-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails;
