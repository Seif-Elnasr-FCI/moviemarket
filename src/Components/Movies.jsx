import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
  const [trendingMovies,setTrendingMovies] =useState([])
  const nums = new Array(13).fill(1).map((elment,idx)=>idx+1)
  console.log(nums)

  async function getTrendingMovies(pageNum){
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adults=false&include_videos=false&page=${pageNum}`)
    setTrendingMovies(data.results)
  }

  useEffect(() => {
    getTrendingMovies(1)
  }, []);

  return (
    <>
       <div className="row justify-content-center">
        
       <nav className='py-5'>
          <ul className='pagination pagination-sm d-flex justify-content-center '>
            {
              nums.map((pageN)=><li key={pageN} className='page-item' onClick={()=>getTrendingMovies(pageN)}>
                <a className='page-link bg-transparent text-white' style={{cursor:"pointer"}}>{pageN}</a>
              </li>)
            }
          </ul>
        </nav>


       {trendingMovies.map((movie,i)=><div key={i} className='col-sm-4 col-md-2'>
          <div className="movie">
            <Link to={`movieDetails/${movie.id}`}>
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie" />
            <h3 className='h6 my-2'>{movie.title}</h3>
            </Link>
          </div>
        </div>)}


        </div>
    </>
  )
}
