
import { useState, useEffect, useMemo } from 'react';
import { Movie, Genre } from '../types/movie';
import MovieService from "@/services/movies"



export const useMovies = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [failed, setFailed] = useState(false)


  // Simulate API loading
  useEffect(() => {

    const fetchMovies = async () => {

      const result = await MovieService.getMovies()
      setMovies(result)
      setLoading(false)

    }

    const fetchGenres = async () => {

      const result = await MovieService.getGenres()
      setGenres(result)
    }

    fetchMovies()
    fetchGenres()
  }, []);


  // Filter movies based on search term
  const filteredMovies = useMemo(() => {
    if (!searchTerm.trim()) return movies;

    const filteredMovies = movies.filter((movie) => {

      return (
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre_ids.map(genre => genres.find(g => g.id === Number(genre))).some(genre =>
          genre.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        movie.release_date.toString().includes(searchTerm)
      )
    })

    return filteredMovies

  }, [movies, searchTerm]);

  useEffect(() => {

    const trimmed = searchTerm.trim()

    if(!trimmed){
      MovieService.getMovies().then(result => {
        setMovies(result)
      })
      return;
    }

    if(filteredMovies.length === 0){
      
      setLoading(true)
      const delayDebounce = setTimeout(() => {
        MovieService.searchMovies(trimmed).then((results) => {
          setMovies(results);
          if(results.length == 0) setFailed(true)
          setLoading(false)
        })
      },1000)

      return () => clearTimeout(delayDebounce)
    }
    

  },[searchTerm])



  return {
    movies: filteredMovies.length === 0 ? movies : filteredMovies,
    genres,
    loading,
    searchTerm,
    setSearchTerm,
    totalMovies: movies.length,
    filteredCount: filteredMovies.length,
    failed
  };
};
