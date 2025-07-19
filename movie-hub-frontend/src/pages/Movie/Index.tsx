import { useMovie } from "@/hooks/useMovie";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowLeft, Star, Calendar, Clock, Play, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  console.log(id);

  const { movie, loading } = useMovie(id);

  if(loading) return (<h1>wait....</h1>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
      <Header />
      <div className="relative">
        <div className="absolute inset-0 h-[70vh] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/10 to-gray" />
        </div>


        {/* Content */}
        <div className=" relative container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Button>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-80 h-auto rounded-xl shadow-2xl border border-border/50"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-6 pt-8 lg:pt-16">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-white">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6 text-white">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{movie.release_date.slice(0, 4)}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{movie.runtime}</span> 
                  </div>

                  {movie.vote_average > 0 && (
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6 hover:cursor-pointer">
                  {movie.genres?.map((genre) => (
                    <Badge
                      key={genre.id}
                      variant="secondary"
                      className="bg-primary/70 text-primary-foreground border-primary/40"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-white">
                  {movie.overview}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Trailer
                  </Button>

                  <Button variant="outline" className="hover:bg-white/70">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Add to Watchlist
                  </Button>

                  <Button variant="ghost" className="hover:bg-primary/80 text-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      {/* {similarMovies.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Similar Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {similarMovies.map((similarMovie) => {
              const similarGenres = similarMovie.genre_ids.map(
                (id) =>
                  genres.find((genre) => genre.id === Number(id))?.name ||
                  "Unknown"
              );
              return (
                <div
                  key={similarMovie.id}
                  onClick={() => navigate(`/movie/${similarMovie.id}`)}
                >
                  <MovieCard movie={similarMovie} genres={similarGenres} />
                </div>
              );
            })}
          </div>
        </section>
      )} */}

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            MovieMind - Your gateway to cinematic discovery
          </p>
          <p className="text-muted-foreground/70 text-sm mt-2">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
