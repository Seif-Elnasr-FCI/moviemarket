import { useContext } from 'react'
import profile from '../images/personAvatat.png'
import { Link } from 'react-router-dom'
import { moviesContext } from '../Context/Store'

export default function Home() {

  let {trendingMovies,trendingTv,trendingPeople} = useContext(moviesContext)

  return (
    <>
    {/* movies */}
      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div>
              <div className="brdr w-25 mb-4"></div>
              <h2 className='h3 text-capitalize'>trendig <br/> Movies<br/>to watch right now</h2>
              <p className='text-muted text-capitalize'>top trendin movies by day</p>
              <div className="brdr mb-t"></div>
          </div>
        </div>
        {trendingMovies.map((movie,i)=><div key={i} className='col-sm-4 col-md-2'>
          <div className="movie">
            <Link to={`movieDetails/${movie.id}`}>
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie" />
            <h3 className='h6 my-2'>{movie.title}</h3>
            </Link>
          </div>
        </div>)}
      </div>
      {/* tv */}
      <div className="row my-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
              <div className="brdr w-25 mb-4"></div>
              <h2 className='h3 text-capitalize'>trendig <br/> tv<br/>to watch right now</h2>
              <p className='text-muted text-capitalize'>top trendin tv by day</p>
              <div className="brdr mb-t"></div>
          </div>
        </div>
        {trendingTv.map((tv,i)=><div key={i} className='col-sm-4 col-md-2'>
          <div className="tv">
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="tv" />
            <h3 className='h6 my-2'>{tv.name}</h3>
          </div>
        </div>)}
      </div>
      {/* people */}
      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div>
              <div className="brdr w-25 mb-4"></div>
              <h2 className='h3 text-capitalize'>trendig <br/> people<br/>to watch right now</h2>
              <p className='text-muted text-capitalize'>top trendin people by day</p>
              <div className="brdr mb-t"></div>
          </div>
        </div>
        {trendingPeople.map((person,i)=><div key={i} className='col-sm-4 col-md-2'>
          <div className="person">
            {person.profile_path===null ? <img src={profile} alt="img" className='w-100' height={294} />
            :<img className='w-100' src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="person" />
            }
            <h3 className='h6 my-2'>{person.name}</h3>
          </div>
        </div>)}
      </div>
    </>
  )
}
