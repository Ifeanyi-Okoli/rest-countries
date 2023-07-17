import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SingleCountry() {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };

    getSingleCountry();
  }, [name]);

  useEffect(() => {
    document.title = `Country | ${name}`;
  }, [name]);

  return (
    <>
      <section className="p-8 md:py-0 max-w-7xl mx-auto">
        {country.map((item) => (
          <div
            key={item.population}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:h-screen md:justify-between"
          >
            <article className="flex flex-col md:flex-row gap-8 ">
              <img
                src={item.flags.svg}
                alt={item.name.common}
                className="md:h-72 w-full object-cover "
              />
            </article>
            <article className="gap-12 md:mt-56">
              <h1 className="mb-8 font-bold text-gray-900 text-4xl lg:text-6xl dark:text-white ">
                {item.name.official}
              </h1>
              <ul className="my-4 py-2 items-start justify-start gap-4 text-slate-700 dark:text-gray-400">
                <li >Capital: {item.capital[0]}</li>
                <li className="py-2">Region: {item.region}</li>
                <li className="py-2">Subregion: {item.subregion}</li>
                <li className="py-2">Population: {item.population.toLocaleString()}</li>
                <li className="py-2">Area: {item.area.toLocaleString()} km²</li>
                <li className="py-2">Timezone: {item.timezones[0]}</li>
                <li>Currency: {item.currencies[0]}</li>
              </ul>
              {item.borders && (
                <>
                  <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white ">
                    Borders:
                  </h3>
                  <ul className="flex flex-wrap items-start justify-start gap-2">
                    {item.borders.map((border, index) => (
                      <li
                        key={index}
                        className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                      >
                        {border}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Link
                to="/"
                className="mt-8 inline-block bg-white text-gray-700  px-6 py-2 rounded shadow hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
              >
                &larr; Back
              </Link>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
