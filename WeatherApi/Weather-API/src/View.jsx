export default function View({ weather }) {
  let hot_url = "https://images.unsplash.com/photo-1561473880-3b8b12de0a71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let cold_url = "https://images.unsplash.com/photo-1519944159858-806d435dc86b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let humidity_url = "https://images.unsplash.com/photo-1593081849794-ff9b66f8cb4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGh1bWlkaXR5fGVufDB8fDB8fHww";

  if (!weather)
    return (
      <p className="text-center text-gray-400 mt-10">
        Search a city to see weather
      </p>
    );

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
      <img
        src={
          weather.current.temp_c > 30
            ? hot_url
            : weather.current.temp_c < 15
            ? cold_url
            : humidity_url
        }
        alt="weather condition"
        className="w-full h-48 object-cover"
      />
      <div className="p-6 text-white space-y-2">
        <h2 className="text-2xl font-bold">{weather.location.region}</h2>
        <p className="text-4xl font-semibold text-blue-400">
          {weather.current.temp_c}°C
        </p>
        <p className="text-gray-300">
          Feels like: {weather.current.feelslike_c}°C
        </p>
        <p className="text-gray-300">
          Humidity: {weather.current.humidity}%
        </p>
      </div>
    </div>
  );
}