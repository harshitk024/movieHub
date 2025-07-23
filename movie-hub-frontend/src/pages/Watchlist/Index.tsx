import Header from "@/components/Header";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { useWatchList } from "@/hooks/useWatchlist";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const {watchList,isLoading} = useWatchList();



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
      <Header />
      <div className="p-5">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>
      </div>

            <div className="pl-7">
        <h1 className="text-3xl font-bold text-foreground mb-10">
          Your Watchlist
        </h1>
      </div>

      {isLoading ? <LoadingSkeleton /> : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-5">
            {watchList.map((movie) => (
                <MovieCard movie={movie} key = {movie.id} />
            ))}
        </div>   

      )}
    </div>
  );
};

export default Index;
