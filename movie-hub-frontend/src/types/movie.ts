
export interface Movie{

  adult: boolean,
  backdrop_path: string,
  id: string,
  title: string,
  overview: string,
  original_language: string,
  poster_path: string,
  genre_ids?: Array<string>,
  genres?: Array<Genre>;
  popularity: number,
  release_date: string,
  vote_average: number,
  vote_count: number,
  runtime: number
}

export interface Genre{

  id: number,
  name: string

}

export interface MovieCardProps {
  movie: Movie;
}

export interface User{

  username: string,
  email : string,
  watchlist: Array<string>,
  liked: Array<string>
}

export interface UserState {
  
  user: User,
  access: string,
  refresh: string
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
