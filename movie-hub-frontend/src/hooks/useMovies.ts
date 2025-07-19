
import { useState, useEffect, useMemo } from 'react';
import { Movie, Genre } from '../types/movie';
import MovieService from "@/services/movies"



export const useMovies = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [failed, setFailed] = useState(false)


  const updateMovies = (movies,genres) => {

    const updatedMovies = movies.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((id) => (
        genres.find((gen) => Number(gen.id) === Number(id))
      ))
    }))

    setMovies(updatedMovies)
    return updatedMovies
  }


  // Simulate API loading
  useEffect(() => {


    const fetchData = async () => {

      const movieResult = await MovieService.getMovies()
      const genreResult = await MovieService.getGenres()


      setGenres(genreResult)
      updateMovies(movieResult,genreResult)
      setLoading(false)

    }

    fetchData()


  }, []);


  // Filter movies based on search term
  const filteredMovies = useMemo(() => {
    if (!searchTerm.trim()) return movies;

    const filteredMovies = movies.filter((movie) => {

      return (
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          genres.some(genre =>
            genre.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          movie.release_date === null ? false : movie.release_date.toString().includes(searchTerm)
      )
    })

    return filteredMovies

  }, [movies, searchTerm]);

  useEffect(() => {

    const trimmed = searchTerm.trim()

    if (!trimmed) {
      MovieService.getMovies().then(result => {
        updateMovies(result,genres)
      })
      return;
    }

    if (filteredMovies.length === 0) {

      setLoading(true)
      const delayDebounce = setTimeout(() => {
        MovieService.searchMovies(trimmed).then((results) => {
          updateMovies(results,genres)
          if (results.length == 0) setFailed(true)
          setLoading(false)
        })
      }, 1000)

      return () => clearTimeout(delayDebounce)
    }


  }, [searchTerm])



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
