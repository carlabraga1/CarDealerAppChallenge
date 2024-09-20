"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    )
      .then((response) => response.json())
      .then((data) => setMakes(data.Results));
  }, []);

  const isButtonDisabled = !selectedMake || !selectedYear;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Select a Vehicle</h1>
      <select
        onChange={(e) => setSelectedMake(e.target.value)}
        className="mb-4"
      >
        <option value="">Select a brand</option>
        {makes.map((make) => (
          <option key={make.MakeId} value={make.MakeId}>
            {make.MakeName}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setSelectedYear(e.target.value)}
        className="mb-4"
      >
        <option value="">Select the year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <Link href={`/result/${selectedMake}/${selectedYear}`}>
        <button
          disabled={isButtonDisabled}
          className={`p-2 bg-blue-500 text-white ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next Page 
        </button>
      </Link>
    </div>
  );
}
