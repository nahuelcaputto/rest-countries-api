import { Country, CountryCardData, CountryDetailData } from "./types";

/**
 * Maps raw API country data to CountryCardData format
 */
export function mapToCardData(country: Country): CountryCardData {
  return {
    name: country.name.common,
    code: country.cca3,
    capital: country.capital?.[0] || "N/A",
    region: country.region,
    population: country.population,
    flag: country.flags.svg || country.flags.png,
    flagAlt: country.flags.alt || `Flag of ${country.name.common}`,
  };
}

/**
 * Maps raw API country data to CountryDetailData format
 */
export function mapToDetailData(country: Country): CountryDetailData {
  // Get native name (first available)
  const nativeNameObj = country.name.nativeName;
  let nativeName = country.name.common;
  if (nativeNameObj) {
    const firstKey = Object.keys(nativeNameObj)[0];
    if (firstKey) {
      nativeName = nativeNameObj[firstKey].common;
    }
  }

  // Get currencies as comma-separated string
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((curr) => curr.name)
        .join(", ")
    : "N/A";

  // Get languages as comma-separated string
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return {
    name: country.name.common,
    code: country.cca3,
    capital: country.capital?.[0] || "N/A",
    region: country.region,
    population: country.population,
    flag: country.flags.svg || country.flags.png,
    flagAlt: country.flags.alt || `Flag of ${country.name.common}`,
    nativeName,
    subregion: country.subregion || "N/A",
    topLevelDomain: country.tld?.[0] || "N/A",
    currencies,
    languages,
    borders: country.borders || [],
  };
}

/**
 * Formats a number with thousand separators
 */
export function formatPopulation(population: number): string {
  return population.toLocaleString("en-US");
}
