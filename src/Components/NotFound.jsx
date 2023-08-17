import React from 'react'
import err404 from '../images/404.jpg'
export default function NotFound() {
  return (
    <div className="container text-center my-5">
      <p>The page you are looking for does not exist.</p>
      <img className='w-100' src={err404} alt="img" />
    </div>
  )
}
