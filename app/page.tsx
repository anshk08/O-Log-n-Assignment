import React from "react";
import Autocomplete from "@/components/auto-complete";
import { Carter_One } from "next/font/google";
import { cn } from "@/lib/utils";

const carterOne = Carter_One({ subsets: ["latin"], weight: "400" });

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center justify-center gap-6 -mt-32 md:-mt-40">
        <div
          className={cn(
            "font-bold text-3xl md:text-5xl flex items-center justify-center text-center",
            carterOne.className
          )}
        >
          Weather Application
        </div>
        <Autocomplete />
      </div>
    </div>
  );
};

export default Home;
