import React from "react";
import Autocomplete from "@/components/auto-complete";
import { Bricolage_Grotesque } from "next/font/google";
import { cn } from "@/lib/utils";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400"] });

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center justify-center gap-6 -mt-32 md:-mt-40">
        <div
          className={cn(
            "font-bold text-3xl md:text-5xl flex items-center justify-center text-center",
            bricolage.className
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
