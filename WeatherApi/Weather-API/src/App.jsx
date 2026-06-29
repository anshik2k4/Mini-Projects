import { useState } from 'react'
import City from './City'
import View from './View'
import { getWeather } from './Weather'

function App() {
  let [weather, setweather] = useState(null);

  async function cityHandler(city) {
    const data = await getWeather(city);
    setweather(data);
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h1 className="text-4xl font-bold text-center text-white mb-2">
        Weather App
      </h1>
      <p className="text-center text-gray-400 mb-6">
        Search any city to check live weather
      </p>
      <City getCity={cityHandler} />
      <View weather={weather} />
    </div>
  )
}

export default App