import logo from "./logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setcities] = useState([]);
  const [selCountry, setSelCountry] = useState("");
  const [selState, setselState] = useState("");
  const [selCity, setselCity] = useState("");


  useEffect(() => {
    (async () => {
      try {
        var response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(response.data);
      } catch (err) {
        //return new Error("Failed to Fetch !", err);
        console.error("Failed to fetch");
      }
    })();
  });
  function getStates(country) {
    (async () => {
      try {
        var response = await axios.get(
          "https://crio-location-selector.onrender.com/country=" +
            country +
            "/states"
        );
        setStates(response.data);
        document.getElementById("state").removeAttribute("disabled");
        setSelCountry(country);
      } catch (err) {
        console.error("Failed to fetch");
      }
    })();
  }
  function getCities(state) {
    // console.log(state)
    (async () => {
      try {
        var response = await axios.get(
          "https://crio-location-selector.onrender.com/country="+selCountry+"/state="+state+"/cities"
        );
        setcities(response.data);
        // console.log(response.data)
        document.getElementById("city").removeAttribute("disabled");
        setselState(state);
      } catch (err) {
        //return new Error("Failed to Fetch !", err);
        console.error("Failed to fetch");
      }
    })();
  }
  function setCity(city){
    setselCity(city);
  }
  return (
    <div className="App">
      <h1>Select Location</h1>

      <select
        name="country"
        id="country"
        onChange={(e) => getStates(e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((data) => (
          <option value={data}>{data}</option>
        ))}
      </select>
      <select
        name="state"
        id="state"
        onChange={(e) => getCities(e.target.value)}
        disabled
      >
        <option value="">Select State</option>
        {states.map((data) => (
          <option value={data}>{data}</option>
        ))}
      </select>
      <select name="city" id="city" disabled onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        {cities.map((data) => (
          <option value={data}>{data}</option>
        ))}
      </select>
      <p>{selCity?(<>You selected {selCity}, {selState}, {selCountry}</>):<></>}</p>
    </div>
  );
}

export default App;
