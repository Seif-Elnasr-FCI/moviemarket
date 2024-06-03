import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Navbar({userToken,logOut}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
  <div className="container-fluid">
    <NavLink  className="navbar-brand" to="">Movie<span className='fst-italic fw-bold text-warning'>M</span>arket</NavLink >
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken?<>
          <li className="nav-item">
          <NavLink  className="nav-link" aria-current="page" to="">Home</NavLink >
        </li>
        <li className="nav-item">
          <NavLink  className="nav-link" to="movies">Movies</NavLink >
        </li>
        <li className="nav-item">
          <NavLink  className="nav-link" to="people">People</NavLink >
        </li>
        <li className="nav-item">
          <NavLink  className="nav-link" to="tv">TV</NavLink >
        </li>
        <li className="nav-item">
          <NavLink  className="nav-link" to="contact">Contact</NavLink >
        </li>
        </>:''}

      </ul>

      <ul className="navbar-nav d-flex mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center order-last order-lg-first">
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook mx-2"></i></a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin mx-2"></i></a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram mx-2"></i></a>
        </li>
        {userToken?<li className="nav-item">
          <span onClick={logOut} className="nav-link" style={{cursor:"pointer"}}>Logout</span>
        </li>:<>
        <li className="nav-item">
          <NavLink  className="nav-link" to="login">Login</NavLink >
        </li>
        <li className="nav-item">
          <NavLink  className="nav-link" to="register">Register</NavLink >
        </li>
        </>}
        
        
      </ul>
    </div>
  </div>
</nav>
  )
}
