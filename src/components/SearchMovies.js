import React, { useState } from 'react'
import MovieCard from './MovieCard';

function SearchMovies(props) {

    const [ query, setQuery ] = useState('');
    const [ movies, setMovies ] = useState([]);

    const searchMovies = async(e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=bd41ac291800bbc65d01b467a9ffa213&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data)
            setMovies(data.results);
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form className='form' onSubmit={searchMovies}>
                <label className='label' htmlFor='query'>Movie name</label>
                <input className='input' type='text' name='query' placeholder='Ex. Lord of the Rings...'  value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className='button' type='submit'>Search</button>
            </form>
            <div className='card-list'>
                {movies.filter(movie => movie.poster_path).map(movie => (<MovieCard movie={movie} key={movie.id} />))}
            </div>
        </div>
    )
}

export default SearchMovies