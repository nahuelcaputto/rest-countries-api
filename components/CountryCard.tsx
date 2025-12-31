import Link from "next/link";
import Image from "next/image";
import { CountryCardData } from "@/lib/types";
import { formatPopulation } from "@/lib/mappers";

interface CountryCardProps {
  country: CountryCardData;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/country/${country.code}`}
      className="group rounded-md overflow-hidden shadow-md flex flex-col h-full bg-(--element-bg) hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--foreground)"
      style={{
        boxShadow: "0 0 12px 2px var(--shadow)",
      }}
    >
      {/* Flag Container */}
      <div className="relative w-full aspect-16/10 overflow-hidden">
        <Image
          src={country.flag}
          alt={country.flagAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-7 pb-10 flex-1 flex flex-col">
        <h2 className="text-lg font-extrabold mb-4 leading-tight group-hover:text-blue-500">
          {country.name}
        </h2>
        <div className="space-y-1.5 text-sm">
          <p className="flex gap-1.5">
            <span className="font-semibold">Population:</span>
            <span className="font-light opacity-80">
              {formatPopulation(country.population)}
            </span>
          </p>
          <p className="flex gap-1.5">
            <span className="font-semibold">Region:</span>
            <span className="font-light opacity-80">{country.region}</span>
          </p>
          <p className="flex gap-1.5">
            <span className="font-semibold">Capital:</span>
            <span className="font-light opacity-80">{country.capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
