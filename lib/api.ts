import { Country } from "./types";

const API_BASE_URL = "https://restcountries.com/v3.1";

/**
 * Centralized API layer for REST Countries API
 * All functions throw human-readable errors on failure
 * NO console logging allowed per PRD requirements
 */

/**
 * Fetches all countries from the API
 */
export async function fetchAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/all?fields=name,cca3,capital,region,population,flags`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch countries. Server responded with status ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No country data received from the API");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to load countries: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while loading countries");
  }
}

/**
 * Fetches a single country by its ISO 3166-1 alpha-3 code
 */
export async function fetchCountryByCode(code: string): Promise<Country> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/alpha/${code}?fields=name,cca3,capital,region,subregion,population,flags,tld,currencies,languages,borders`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Country with code "${code}" not found`);
      }
      throw new Error(
        `Failed to fetch country. Server responded with status ${response.status}`
      );
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Invalid country data received from the API");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to load country details: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while loading country details"
    );
  }
}

/**
 * Fetches multiple countries by their ISO codes
 */
export async function fetchCountriesByCodes(
  codes: string[]
): Promise<Country[]> {
  if (codes.length === 0) {
    return [];
  }

  try {
    const codesParam = codes.join(",");
    const response = await fetch(
      `${API_BASE_URL}/alpha?codes=${codesParam}&fields=name,cca3`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch border countries. Server responded with status ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid border country data received from the API");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to load border countries: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while loading border countries"
    );
  }
}
