"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, SendHorizonal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Locality {
  locality_name: string;
  locality_id: string;
}

export default function Autocomplete() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Locality[]>([]);
  const [allLocalities, setAllLocalities] = useState<Locality[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch localities from JSON file
    fetch("/localities.json")
      .then((response) => response.json())
      .then((data) => setAllLocalities(data));
  }, []);

  useEffect(() => {
    // Filter suggestions based on input value
    if (inputValue.length > 0) {
      const filteredSuggestions = allLocalities.filter((locality) =>
        locality.locality_name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, allLocalities]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length === 0) {
      setShowSuggestions(true); // Show all suggestions when input is cleared
    }
  };

  const handleClick = () => {
    setShowSuggestions(true); // Show all suggestions when input is clicked
  };

  const handleBlur = () => {
    // Hide suggestions when input loses focus
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSelect = (locality: Locality) => {
    setInputValue(locality.locality_name);
    setSuggestions([]);
    setShowSuggestions(false);
    router.push(`/weather/${locality.locality_id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedLocality = allLocalities.find(
      (locality) =>
        locality.locality_name.toLowerCase() === inputValue.toLowerCase()
    );
    if (selectedLocality) {
      router.push(`/weather/${selectedLocality.locality_id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer" />
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        className="w-[80vw] md:w-[50vw] pl-9 border-2"
        placeholder="Search for a Locality"
      />
      {showSuggestions && (
        <ul className="absolute z-10 border rounded-md mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-black">
          {(inputValue.length > 0 ? suggestions : allLocalities)
            .sort((a, b) => a.locality_name.localeCompare(b.locality_name))
            .map((locality) => (
              <li
                key={locality.locality_id}
                onClick={() => handleSelect(locality)}
                className="p-2 cursor-pointer hover:bg-black/10 dark:hover:bg-white/15"
              >
                {locality.locality_name}
              </li>
            ))}
        </ul>
      )}
      {inputValue.length > 0 && (
        <Button
          type="submit"
          className="absolute top-0 right-1 text-blue-400 hover:bg-transparent hover:text-blue-700"
          variant="ghost"
        >
          <SendHorizonal />
        </Button>
      )}
    </form>
  );
}
