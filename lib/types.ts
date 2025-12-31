// TypeScript interfaces for the application

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca3: string; // 3-letter country code
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  tld?: string[]; // Top-level domain
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[]; // Array of country codes
}

export interface CountryCardData {
  name: string;
  code: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
  flagAlt: string;
}

export interface CountryDetailData extends CountryCardData {
  nativeName: string;
  subregion: string;
  topLevelDomain: string;
  currencies: string;
  languages: string;
  borders: string[];
}

export interface BorderCountry {
  name: string;
  code: string;
}

export type Region =
  | "All"
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania";
