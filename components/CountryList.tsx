"use client";

import { useState, useMemo } from "react";
import { CountryCardData, Region } from "@/lib/types";
import SearchInput from "./SearchInput";
import RegionFilter from "./RegionFilter";
import CountryCard from "./CountryCard";

interface CountryListProps {
  countries: CountryCardData[];
}

export default function CountryList({ countries }: CountryListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region>("All");

  // Filter countries based on search and region
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRegion =
        selectedRegion === "All" || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchQuery, selectedRegion]);

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
      </div>

      {/* Countries Grid */}
      {filteredCountries.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold mb-2">No countries found</p>
          <p className="text-sm" style={{ color: "var(--input-text)" }}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-16">
          {filteredCountries.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
