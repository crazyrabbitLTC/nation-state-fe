import { useState } from "react";

type Country = {
  name: string;
  code: string;
  emoji: string;
};

type DropdownProps = {
  countries: Country[];
};

const SupportedCountriesDropdown: React.FC<DropdownProps> = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountrySelect = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    setSelectedCountry(country || null);
  };

  return (
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-sm m-1">
        {selectedCountry ? `${selectedCountry.emoji} ${selectedCountry.name}` : "Select a Country"}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => setSelectedCountry(null)}>Supported Countries</a>
        </li>
        {countries.map((country) => (
          <li key={country.code}>
            <a onClick={() => handleCountrySelect(country.code)}>{country.emoji}{" "}{country.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupportedCountriesDropdown;
