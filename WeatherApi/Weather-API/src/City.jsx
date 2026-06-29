import { useState } from "react";
import { getWeather } from "./Weather";

export default function City({ getCity }) {
  let [city, setcity] = useState("");

  let onChange = (event) => {
    setcity(event.target.value);
  };

  let onSubmit = (event) => {
    event.preventDefault();
    getCity(city);
    setcity("");
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-3 justify-center mt-10">
      <input
        type="text"
        placeholder="Enter City"
        onChange={onChange}
        value={city}
        className="bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg w-64 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Search
      </button>
    </form>
  );
}