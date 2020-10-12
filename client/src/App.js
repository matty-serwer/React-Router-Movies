import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';

import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
import SavedList from './Movies/SavedList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);



  const addToSavedList = id => {
    
    setSaved(saved.concat(id));
    console.log(saved)
  };

  return (
    <div>
      <SavedList list={movieList.filter(movie => {
        return saved.includes(movie.id)
      })} />

      <div>
        <Switch>
          <Route path={`/movies/:movieID`} >
            <Movie addToSavedList={addToSavedList}/>
          </Route>

          <Route exact path='/'>
            <MovieList movies={movieList}/>
          </Route>
        </Switch>

      </div>
    </div>
  );
}
