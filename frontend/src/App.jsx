import axios from 'axios';
import { createContext, useEffect } from 'react';
import { useState } from 'react'  
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  Route, Routes } from 'react-router-dom';
import './App.css'
import NavBar from './component/NavBar';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import InTheater from './pages/InTheater';
import Search from './pages/Search';
import TopRatedMovies from './pages/TopRatedMovies';
import TopRatedinIndia from './pages/TopRatedinIndia';
import MoviesComing from './pages/MoviesComing';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { store } from './app/store';
import { fetchMovies, getAllMovies, getMoviesStatus } from './features/movieSlice'; 
import Loading from './pages/Loading';
import MovieDetails from './pages/MovieDetails';

export const Context = createContext()

function App() {  
  const [search,setSearch] = useState('')
  const dispatch = useDispatch();
  
  const movies = useSelector(getAllMovies);
  const moviesStatus = useSelector(getMoviesStatus);
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(()=>{
    // switch(moviesStatus) {
    //   case 'idle':
    //     navigate('/loading')
    //     dispatch(fetchMovies())
    //     break;
    //   case 'loading': 
    //     navigate('/loading')
    //     break;
    //   case 'succeeded': 
    //     navigate('/')
    //     break;
    //   default: 
    // }

    if(moviesStatus === 'idle'){
        dispatch(fetchMovies())
    } 
  },[moviesStatus,dispatch])
  
  

  return ( 
      <div className="App"> 
      {/* { location.pathname !== '/loading' ? <NavBar/> : ''} */}
        {/* <Context.Provider value={{search,setSearch}}> */}
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/> 
            <Route path='/:id' element={<MovieDetails/>}/> 
            <Route path='/movies-coming' element={<MoviesComing/>}/>
              <Route path='movies-coming/:id' element={<MovieDetails/>}/>   
            <Route path='/top-rated-india' element={<TopRatedinIndia/>}/> 
            <Route path='/top-rated-india/:id' element={<MovieDetails/>}/>   
            <Route path='/top-rated-movies' element={<TopRatedMovies/>}/> 
            <Route path='/top-rated-movies/:id' element={<MovieDetails/>}/>   
            <Route path='/movies-in-theaters' element={<InTheater/>}/> 
            <Route path='/movies-in-theaters/:id' element={<MovieDetails/>}/>   

            <Route path='/favourites' element={<Favourites/>}/> 
            <Route path='/favourites/:id' element={<MovieDetails/>}/>   

            <Route path='/search' element={<Search/>}/>  
            <Route path='/search/:id' element={<MovieDetails/>}/>   

            {/* <Route path='/loading' element={<Loading/>}/>  */}
          </Routes> 
          {/* </Context.Provider> */}
      </div> 
  )
}

export default App
