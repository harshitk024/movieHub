import Header from "@/components/Header";
import BackTo from "@/components/BacktoButton";
import { useActions } from "@/hooks/useActions";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import MovieCard from "@/components/MovieCard";

const Index = () => {

  const {fav,isFavLoading} = useActions()
 
                                                                   
  return (
    <div>
      <Header />
      <div className="p-5">
        <BackTo page={"home"} />
      </div>

     <div className="pl-7">
        <h1 className="text-3xl font-bold text-foreground mb-10">
          Your Favourites
        </h1>
      </div>

       {isFavLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-5">
          {fav.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
