import Header from "@/components/Header";
import BackToButton from "@/components/BacktoButton";
import { useRatings } from "@/hooks/useRatings";
import { Calendar, Clock, Star } from "lucide-react";
import ReactStars from "react-rating-stars-component";
import { Movie } from "@/types/movie";
import { useNavigate } from "react-router-dom";
const convertMinsToHours = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return { hours, minutes };
};

const MovieCard = ({ ratedMovie }: {ratedMovie: Movie}) => {
  const { hours, minutes } = convertMinsToHours(ratedMovie.runtime);

  console.log(ratedMovie);

  return (
    <>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${ratedMovie.poster_path}`}
          alt={ratedMovie.title}
          className="w-60 h-50 rounded-xl shadow-2xl border border-border/50"
        />
      </div>
      <div className="flex-grow p-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold">{ratedMovie.title}</h1>
          <div className="flex gap-5 text-sm md:text-lg">
            <div className="">
              <p className="opacity-1/2 flex items-center gap-2 text-gray-500 font-semibold">
                <Calendar width={17} height={17} color="gray" />
                {ratedMovie.release_date.slice(0, 4)}
              </p>
            </div>
            <div>
              <p className="opacity-1/2 flex items-center gap-2 text-gray-500 font-semibold">
                <Clock width={17} height={17} />
                {`${hours}h ${minutes}m`}
              </p>
            </div>
            <div>
              <p className="opacity-1/2 flex items-center gap-1 text-gray-500 font-semibold">
                <Star width={17} height={17} fill="#F6BE00" color="#F6BE00" />
                {`${(ratedMovie.vote_average / 2).toFixed(1)}`}
                {"  "}
                {`(${getVoteCount(ratedMovie.vote_count)})`}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {ratedMovie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 bg-purple-600/30 text-black-300 text-xs rounded-md 
                       border border-purple-500/30 group-hover:text-white"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="self-start flex items-center ">
            <ReactStars
              count={5}
              edit={false}
              size={48}
              value={ratedMovie.user_rating}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />

            <div className="font-semibold text-4xl hidden md:block">
              {ratedMovie.user_rating === null
                ? "N/A"
                : `${ratedMovie.user_rating}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RatedMoviesList = ({ movies }: {movies: Movie[]}) => {

  const navigate = useNavigate();
  return (
    <>
      {movies.map((ratedMovie) => {
        return (
          <div
            className="border-b-2 p-5 flex flex-col md:flex-row hover:bg-gray-100 "
            key={ratedMovie.id}
            onClick={() => navigate(`/${ratedMovie.id}`) }
          >
            <MovieCard ratedMovie={ratedMovie} />
          </div>
        );
      })}
    </>
  );
};

const getVoteCount = (count) => {
  const votesinK = Math.floor(count / 1000);

  const decimalVotes = Math.floor((count % 1000) / 100);

  console.log(votesinK);
  console.log(decimalVotes);

  if (votesinK > 0) return `${votesinK}.${decimalVotes}K`;

  return count;
};

const Index = () => {
  const { ratings, isRatingsLoading } = useRatings();

  if (isRatingsLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="p-5">
        <BackToButton page="home" />
      </div>

      <div className="pl-7">
        <h1 className="text-3xl font-bold text-foreground mb-10">
          Your Ratings
        </h1>
        <RatedMoviesList movies={ratings} />
      </div>
      <div className="flex flex-col  p-5 gap-10"></div>
    </div>
  );
};

export default Index;
