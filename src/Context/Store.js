import { createContext, useEffect, useState } from "react"
import Axios from 'axios'

export let moviesContext = createContext(0)

export default function MoviesContextProvider(props){

    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingTv, setTrendingTv] = useState([])
    const [trendingPeople, setTrendingPeople] = useState([])
  
    async function getTrending(mediaType , callback) {
      let {data} = await Axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
      callback(data.results)
    }
  
    useEffect(()=>{
      getTrending('movie',setTrendingMovies)
      getTrending('tv',setTrendingTv)
      getTrending('person',setTrendingPeople)
    },[])

    return <moviesContext.Provider value={{trendingMovies,trendingTv,trendingPeople}}>
        {props.children}
    </moviesContext.Provider>
}