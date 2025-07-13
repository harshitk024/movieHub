import { Star, Calendar} from "lucide-react";
import { MovieCardProps } from "../types/movie";


const MovieCard = ({ movie, genres}: MovieCardProps) => {
  return (
    <div
      className=" flex flex-col group relative rounded-xl overflow-hidden backdrop-blur-sm 
                    border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 
                    hover:scale-105   cursor-default"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 
                   group-hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div className="flex flex-col flex-grow  p-4 group-hover:bg-gradient-to-r from-primary/40 via-primary/10 to-gray border-b border-border backdrop-blur-sm ">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 
                     transition-colors duration-300"
        >
          {movie.title}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{movie.release_date.slice(0,4)}</span>
          </div>

          {(
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{movie.vote_average !== 0 ? movie.vote_average : "N/A"}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {genres.map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-purple-600/30 text-black-300 text-xs rounded-md 
                       border border-purple-500/30 group-hover:text-white"
            >
              {genre}
            </span>
          ))}
          {genres.length > 2 && (
            <span className="px-2 py-1 bg-gray-600/30 text-black-400 text-xs rounded-md 
                           border border-gray-500/30 group-hover:text-white">
              +{genres.length - 2}
            </span>
          )}
        </div>

        {movie.overview && (
          <p className="text-black-400 text-sm line-clamp-2 group-hover:text-white mt-auto">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
