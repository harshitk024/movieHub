import { useMovie } from "@/hooks/useMovie";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Calendar, Clock, Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AuthorizedServices from "@/services/authorized_reqs";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { ToastProvider, ToastViewport, Toast } from "@/components/ui/toast";
import BackToButton from "@/components/BacktoButton";

const Index = () => {
  const { id } = useParams();
  const {
    movie,
    loading,
    currRating,
    setCurrRating,
    action,
    setAction,
    actionDone,
    setActionDone,
  } = useMovie(id);
  const [open, setOpen] = useState(false);

  const handleWatchlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { watchlisted, id } = await AuthorizedServices.toggleWatchlist(
      movie.id
    );

    watchlisted
      ? setActionDone({ ...actionDone, watchlisted: true })
      : setActionDone({ ...actionDone, watchlisted: false });

    if (!watchlisted) {
      setAction({
        ...action,
        watchlist: action.watchlist.filter((wid) => wid !== id),
      });
    }
  };

  const handleFav = async (e: React.MouseEvent<HTMLButtonElement>) => {

    const { fav, id } = await AuthorizedServices.toggleFav(movie.id);

    fav
      ? setActionDone({ ...actionDone, fav: true })
      : setActionDone({ ...actionDone, fav: false });

    if (!fav) {
      setAction({ ...action, fav: action.fav.filter((fid) => fid !== id) });
    }
  };

  const ratingChanged = async (newRating: string) => {
    await AuthorizedServices.toggleRating({
      movie_id: movie.id,
      rating: newRating,
    });

    setCurrRating(newRating);
  };

  if (loading) return <h1>wait....</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
      <Header />
      <div className="relative">
        <div className="absolute inset-0 h-[70vh] overflow-hidden z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/10 to-gray" />
        </div>

        <div className=" relative container mx-auto px-4 py-8">
          <BackToButton page={-1} />

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="flex-shrink-0 flex flex-col">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-80 h-auto rounded-xl shadow-2xl border border-border/50"
              />
              <div className="self-start flex items-center gap-5">
                <ReactStars
                  key={currRating}
                  count={5}
                  onChange={ratingChanged}
                  size={48}
                  value={currRating}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                <div className="font-bold text-4xl">
                  {currRating === null ? "N/A" : `${currRating}/5`}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4  md:text-white ">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6 md:text-white">
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
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={20}
                        value={(movie.vote_average / 2).toFixed(1)}
                        isHalf={true}
                        edit={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="white"
                      />
                      <span className="font-medium text-white">
                        {(movie.vote_average / 2).toFixed(1)}
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

                <div className="max-h-20 overflow-y-auto pr-2 ">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 md:text-white ">
                    {movie.overview}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-10 md:mt-5">
                  <ToastProvider swipeDirection="right">
                    <Button
                      variant="outline"
                      className="hover:bg-white/70"
                      onClick={handleWatchlist}
                    >
                      {action.watchlist.includes(movie.id) ||
                      actionDone.watchlisted ? (
                        <>
                          <Bookmark
                            className="h-4 w-4 mr-2"
                            fill="bg-primary"
                          />
                          Added
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4 mr-2" />
                          Add to watchlist
                        </>
                      )}
                    </Button>
                    <Toast open={open} onOpenChange={setOpen} variant="default">
                      ✅ Added to Watchlist
                    </Toast>
                    <ToastViewport className="fixed top-5 right-5 z-50 flex flex-col gap-2" />
                  </ToastProvider>

                  <Button
                    onClick={handleFav}
                    className="flex justify-center items-center bg-primary hover:bg-primary/90 rounded-full w-12 h-12 group "
                  >
                    {action.fav.includes(movie.id) || actionDone.fav ? (
                      <Heart className="fill-yellow md:fill-white" />
                    ) : (
                      <>
                        <Heart className="group-hover:fill-white" />
                      </>
                    )}
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
