
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import MovieCard from '../../components/MovieCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';

import { useMovies } from '@/hooks/useMovies';

const Index = () => {

  const { movies, loading, searchTerm, setSearchTerm, genres,failed,filteredCount,totalMovies} = useMovies();


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {!loading && (
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {searchTerm ? 'Search Results' : 'Trending Movies'}
            </h2>
            <p className="text-muted-foreground">
              {searchTerm 
                ? `Found ${filteredCount} ${filteredCount === 1 ? 'movie' : 'movies'} matching "${searchTerm}"`
                : `Discover ${totalMovies} popular movies`}
            </p>
          </div>
        )}

        {loading ? (
          <LoadingSkeleton />
        ) : failed ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No movies found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any movies matching "{searchTerm}". 
              Try searching for a different title, genre, or year.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
           {
            movies.map((movie) => {

              // const movieGenres = movie.genre_ids.map(id => genres.find(genre => genre.id === Number(id)).name || 'unknown') 

              return(
              
                <MovieCard key={movie.id} movie={movie}  />
           
              )
            })
           }
          </div>
        )}
      </main>
      
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
