
import { Star, Calendar } from 'lucide-react';
import { MovieCardProps } from '../types/movie';

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm 
                    border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 
                    hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 
                   group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 
                     transition-colors duration-300">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{movie.releaseYear}</span>
          </div>
          
          {movie.rating && (
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{movie.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-md 
                       border border-purple-500/30"
            >
              {genre}
            </span>
          ))}
          {movie.genres.length > 2 && (
            <span className="px-2 py-1 bg-gray-600/30 text-gray-400 text-xs rounded-md 
                           border border-gray-500/30">
              +{movie.genres.length - 2}
            </span>
          )}
        </div>
        
        {movie.overview && (
          <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
