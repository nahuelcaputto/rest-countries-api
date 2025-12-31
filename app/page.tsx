import { fetchAllCountries } from "@/lib/api";
import { mapToCardData } from "@/lib/mappers";
import CountryList from "@/components/CountryList";

export default async function HomePage() {
  const countries = await fetchAllCountries();
  const countryCards = countries.map(mapToCardData);

  return <CountryList countries={countryCards} />;
}
