import React, { useContext } from 'react'
import { moviesContext } from '../Context/Store'

export default function Tv() {
  let {trendingTv} = useContext(moviesContext)

  return (
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
  )
}
