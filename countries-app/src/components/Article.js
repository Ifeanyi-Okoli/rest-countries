import React from 'react';
import { Link } from 'react-router-dom';
export default function Article({
    flags,
    name,
    population,
    region,
    subregion,
    capital,}){
    return (
       <>
       <Link to={`/${name.common}`}>
       
       <article className="bg-white rounded-lg shadow overflow-hidden hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all-duration-200">
            <img src={flags.svg} alt="" className="md:h-72 w-full object-cover " />
            <div className="p-4">
                
            <h2 className="font-bold text-lg text-gray-900 mb-2 dark:text-white mb-2">{name.common}</h2>
            <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-400">
                <li>Population: <span>{population.toLocaleString()}</span></li>
                <li>Region: <span>{region}</span></li>
                <li>Subregion: <span>{subregion}</span></li>

            </ul>
            </div>
        </article>
        </Link>
       </>
    )
}