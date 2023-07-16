import { useState, useEffect } from "react"
import Article from "./Article";
import React from 'react'

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [searchText, setSearchText] = useState("");
    const regions = ["Africa", "Americas", "Antarctic", "Asia", "Europe", "Oceania"]

    useEffect(() => {
        const getCountries = async () => {
            try{
                const response = await fetch("https://restcountries.com/v3.1/all")
                const data = await response.json()
                setCountries(data.slice(0, 10));
            } catch (error) {
                console.log(error)
            }
        };

        getCountries();
    }, []);
    
    const handleSearchCountry = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchText}`)
            const data = await response.json()
            setCountries(data.slice(0, 10));
        } catch (error) {
            console.log(error)
        }
    }

    const handleFilterByRegion = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
            const data = await response.json()
            setCountries(data.slice(0, 10));
        } catch (error) {
            console.log(error)
        }
    }

    function filterByRegion(region) {
        setCountries(countries.filter((country) => country.region === region));
      }

  return (
    <>
      {!countries ? <h1 className="text-gray-800 font-bold uppercase tracking-wide flex justify-center text-center h-screen text-4xl dark:text-white">Loading...</h1> : (
        <section classname="container mx-auto p-8">
            {/* form */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <form onSubmit={handleSearchCountry} autoComplete="off" className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl">
                    <input type="text" placeholder="Search for a country..." name="search" id="search" value={searchText} onChange={(e)=> setSearchText(e.target.value)} className="bg-white dark:bg-gray-800 dark:text-gray-600 px-4 py-2 rounded shadow outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 w-full" />
                </form>

                <form onSubmit={handleFilterByRegion} className="md:flex-1">
                    <select value={regions.name} onChange={e => filterByRegion(e.target.value)} name="filter-by-region" id="filter-by-region" className="bg-white dark:bg-gray-800 dark:text-gray-400 px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-300 w-52">
                        {regions.map((region, index) => (
                            <option key={index} value={region}>{region}</option>
                        ))}
                    </select>
                </form>
            </div>

            <div className="grid dric-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            { countries.map((country) => (
        <Article key={country.name.common} {...country} />))
      } 
            </div>
        </section>
      )}
      
  </>);
}
