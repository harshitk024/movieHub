
export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  releaseYear: number;
  genres: string[];
  rating?: number;
  overview?: string;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
