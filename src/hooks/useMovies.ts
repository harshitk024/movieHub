
import { useState, useMemo, useEffect } from 'react';
import { Movie } from '../types/movie';
import { mockMovies } from '../data/mockMovies';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMovies(mockMovies);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter movies based on search term
  const filteredMovies = useMemo(() => {
    if (!searchTerm.trim()) return movies;
    
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genres.some(genre => 
        genre.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      movie.releaseYear.toString().includes(searchTerm)
    );
  }, [movies, searchTerm]);

  return {
    movies: filteredMovies,
    loading,
    searchTerm,
    setSearchTerm,
    totalMovies: movies.length,
    filteredCount: filteredMovies.length
  };
};
