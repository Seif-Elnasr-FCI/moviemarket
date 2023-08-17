import React, { useContext } from 'react'
import { moviesContext } from '../Context/Store'
import profile from '../images/personAvatat.png'

export default function People() {

  let {trendingPeople} = useContext(moviesContext)
  return (
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
  )
}
