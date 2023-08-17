import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
    let params = useParams()
    const [movieDetails, setMovieDetails] = useState(null)

    async function getMovieDetails(id){
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
        setMovieDetails(data)
    }

    useEffect(()=>{
        getMovieDetails(params.id)
    },[])

  return (
    <div className='my-4'>
      {movieDetails? <div className='row'>
        <div className='col-md-3'>
         <img className='w-100' src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt="movie" />
        </div>
        <div className='col-md-9'>
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.overview}</p>
            <ul>
                <li>popularity : {movieDetails.popularity}</li>
                <li>release_date : {movieDetails.release_date}</li>
                <li>vote_average : {movieDetails.vote_average}</li>
                <li>vote_count : {movieDetails.vote_count}</li>
                <li>budget : {movieDetails.budget}</li>
            </ul>
        </div>
      </div>
      :<div className='vh-100 d-flex justify-content-center align-items-center'>
        <i className='fas fa-spinner fa-spin fa-2x'></i>
      </div>
      }
    </div>
  )
}
