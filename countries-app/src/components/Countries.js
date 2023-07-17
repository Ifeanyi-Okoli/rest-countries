// Importing the necessary modules
import React, { useState, useEffect } from "react"; //importing hooks for fetching our data
import Article from "./Article";

export default function Countries() {
  const [countries, setCountries] = useState([]); //countries is initialised as a =n empoty array and setCountries is the fuction to update countries state.
  const [searchText, setSearchText] = useState(""); // searchText is initialised as an empty string and setSearchText is the function to update searchText state.
  // const regions = ["Africa", "Americas", "Antarctic", "Asia", "Europe", "Oceania"]

  const regions = [
    {
        name: "Select Region...",
      },
    {
      name: "Africa",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
    {
      name: "Asia",
    },
    {
      name: "Europe",
    },
    {
      name: "Oceania",
    },
  ];

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all"); //await gets the data from the API end pointand assigns to variable 'response'
        const data = await response.json(); // await gets the json format of the responseand assigns it to data variable.
        setCountries(data); //the function that updates the countries array
      } catch (error) {
        console.log(error);
      }
    };

    getCountries();
  }, []); //the empty dependency array ensures taht this effect runs only once during the components's life cycle

  async function searchCountry() {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  // const handleSearchCountry = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const response = await fetch(`https://restcountries.com/v3.1/name/${searchText}`)
  //         const data = await response.json()
  //         setCountries(data.slice(0, 10));
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  async function filterByRegion(region) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }

  // function filterByRegion(region) {
  //     setCountries(countries.filter((country) => country.region === region));
  //   }

  useEffect(() => {
    document.title = `Showing All Countries`;
  }, []);

  return (
    <>
      {!countries ? (
        <h1 className="text-gray-800 font-bold uppercase tracking-wide flex justify-center text-center h-screen text-4xl dark:text-white">
          Loading...
        </h1>
      ) : (
        <section className="container mx-auto p-8 ">
          {/* form */}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <form
              onSubmit={handleSearchCountry}
              autoComplete="off"
              className="flex flex-col md:flex-row md:flex-1 gap-4 mb-8 max-w-2xl"
            >
              <input
                type="text"
                placeholder="Search for a country..."
                name="search"
                id="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-white text-gray-800 placeholder-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:bg-gray-700 px-4 py-3 rounded shadow outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 w-full transition-all duration-200"
                required
              />
            </form>

            <form onSubmit={handleFilterByRegion} className="mb-8">
              <select
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
                name="filter-by-region"
                id="filter-by-region"
                className="bg-white text-gray-600 dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-gray-400 px-4 py-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-300 w-52 outline-none"
              >
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {/*thenext line of code uses javascript experession in jsx, hence the need to put it in curly braces*/}
            {countries.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
