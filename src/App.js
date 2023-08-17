import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Components/Home';
import Movies from './Components/Movies';
import Tv from './Components/Tv';
import Login from './Components/Login';
import Register from './Components/Register';
import NotFound from './Components/NotFound';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import People from './Components/People';
import jwtDecode from 'jwt-decode';
import MovieDetails from './Components/MovieDetails';
import MoviesContextProvider from './Context/Store';
import Contact from './Components/Contact';

function App() {
  let navigate = useNavigate()
  const [userToken, setUserToken] = useState(null)

  function saveUserToken(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserToken(decodedToken);
    console.log(decodedToken);
  }

  // component did mount
  useEffect(() => {
    if(localStorage.getItem('userToken')){
      saveUserToken()
    }
  },[])

  function logOut(){
    setUserToken(null)
    localStorage.removeItem('userToken')
    navigate('/login')
  }

  function ProtectedRoute(props){
    if(localStorage.getItem('userToken')===null){
      return <Navigate to='/login'/>
    }
    else{
      return props.children
    }
  }

  return (
    <Fragment>
      <MoviesContextProvider>
      <Navbar logOut={logOut} userToken={userToken}/>
      <div className='container'>
        <Routes>
          <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="people" element={<ProtectedRoute><People /></ProtectedRoute>} />
          <Route path="tv" element={<ProtectedRoute><Tv /></ProtectedRoute>} />
          <Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="movieDetails" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>}>
            <Route path=":id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
          </Route>
          <Route path="login" element={<Login saveUserToken={saveUserToken} />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer/>
      </MoviesContextProvider>
    </Fragment>
  );
}

export default App;
