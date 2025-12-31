import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchCountryByCode, fetchCountriesByCodes } from "@/lib/api";
import { mapToDetailData, formatPopulation } from "@/lib/mappers";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  try {
    const country = await fetchCountryByCode(code);
    return {
      title: `${country.name.common} - REST Countries Explorer`,
      description: `Detailed information about ${country.name.common}`,
    };
  } catch {
    return {
      title: "Country Not Found - REST Countries Explorer",
    };
  }
}

export default async function CountryDetailPage({ params }: PageProps) {
  const { code } = await params;

  const country = await fetchCountryByCode(code);
  const countryDetail = mapToDetailData(country);

  // Fetch border countries if they exist
  let borderCountries: Array<{ name: string; code: string }> = [];
  if (countryDetail.borders.length > 0) {
    try {
      const borderData = await fetchCountriesByCodes(countryDetail.borders);
      borderCountries = borderData.map((c) => ({
        name: c.name.common,
        code: c.cca3,
      }));
    } catch {
      // If border countries fail to load, just show empty array
      borderCountries = [];
    }
  }

  return (
    <div className="mb-20">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-3 px-8 py-2.5 rounded shadow-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-(--foreground) focus:ring-offset-4"
        style={{
          backgroundColor: "var(--element-bg)",
          boxShadow: "0 0 10px 2px var(--shadow)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span className="text-sm">Back</span>
      </Link>

      {/* Country Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mt-16 lg:mt-20">
        {/* Flag */}
        <div className="relative w-full aspect-4/3 lg:aspect-3/2 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={countryDetail.flag}
            alt={countryDetail.flagAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Information */}
        <div className="py-8">
          <h1 className="text-2xl lg:text-4xl font-extrabold mb-8 lg:mb-10 leading-tight">
            {countryDetail.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-12 lg:mb-16">
            {/* Left Column */}
            <div className="space-y-3.5 text-base">
              <p className="flex gap-2">
                <span className="font-semibold whitespace-nowrap">
                  Native Name:
                </span>
                <span className="font-light opacity-80">
                  {countryDetail.nativeName}
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold whitespace-nowrap">
                  Population:
                </span>
                <span className="font-light opacity-80">
                  {formatPopulation(countryDetail.population)}
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold whitespace-nowrap">Region:</span>
                <span className="font-light opacity-80">
                  {countryDetail.region}
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold whitespace-nowrap">
                  Sub Region:
                </span>
                <span className="font-light opacity-80">
                  {countryDetail.subregion}
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold whitespace-nowrap">
                  Capital:
                </span>
                <span className="font-light opacity-80">
                  {countryDetail.capital}
                </span>
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-3.5 text-base">
              <p className="flex gap-2">
                <span className="font-semibold whitespace-nowrap">
                  Top Level Domain:
                </span>
                <span className="font-light opacity-80">
                  {countryDetail.topLevelDomain}
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold whitespace-nowrap">
                  Currencies:
                </span>
                <span className="font-light opacity-80">
                  {countryDetail.currencies}
                </span>
              </p>
              <p className="flex gap-2">
                <span className="font-semibold whitespace-nowrap">
                  Languages:
                </span>
                <span className="font-light opacity-80">
                  {countryDetail.languages}
                </span>
              </p>
            </div>
          </div>

          {/* Border Countries */}
          {borderCountries.length > 0 && (
            <div className="flex flex-col xl:flex-row xl:items-start gap-5">
              <span className="font-semibold text-base mt-1 whitespace-nowrap">
                Border Countries:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {borderCountries.map((border) => (
                  <Link
                    key={border.code}
                    href={`/country/${border.code}`}
                    className="px-6 py-1.5 rounded-sm shadow-md text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--foreground) focus:ring-offset-2"
                    style={{
                      backgroundColor: "var(--element-bg)",
                      boxShadow: "0 0 5px 1px var(--shadow)",
                    }}
                  >
                    {border.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
