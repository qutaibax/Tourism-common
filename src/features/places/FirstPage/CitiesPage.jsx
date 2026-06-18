import Header from "../components/Header";
import BtnAndTilte from "./components/BtnAndTilte";
import CountrySelectFilter from "./components/CountrySelectFilter";
import CityCard from "./components/CityCard";

import axios from "axios";
import React, { useState, useEffect } from "react";

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Use useEffect to run the Axios fetch code when the component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/cities")
      .then((response) => {
        // CRITICAL PART: Drill down into response.data.data
        // to grab the actual array of cities from your JSON structure
        setCities(response.data.data);
        setLoading(false);
       
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  // 3. Handle loading and error states before rendering the data
  if (loading) return <p>Loading cities...</p>;
  if (error) return <p>Error: {error}</p>;
  //Render the post data
  return (
    <div>
      <Header />

      <div>
        <BtnAndTilte />
        <CountrySelectFilter />
      </div>

      <div
        style={{
          width: "80%",
          margin: "0 auto",
          display: "grid",
          // /* إنشاء أعمدة مرنة: بحد أدنى 250px وبحد أقصى يتوزع بالتساوي */
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px", // /* المسافة بين الكروت */
          padding: "20px",
        }}
      >
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}
