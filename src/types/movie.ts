
// export interface Movie {
//   id: number;
//   title: string;
//   posterUrl: string;
//   releaseYear: number;
//   genres: string[];
//   rating?: number;
//   overview?: string;
// }

export interface Movie{

  adult: boolean,
  backdrop_path: string,
  id: string,
  title: string,
  overview: string,
  original_language: string,
  poster_path: string,
  genre_ids: Array<string>,
  popularity: number,
  release_date: string,
  vote_average: number,
  vote_count: number
}

export interface Genre{

  id: number,
  name: string

}

export interface MovieCardProps {
  movie: Movie;
  genres: Array<string>
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
