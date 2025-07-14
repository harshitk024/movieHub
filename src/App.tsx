import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home/Index";
import MoviePage from "./pages/Movie/Index";
import {useMovies}  from "./hooks/useMovies";
import NotFound from "./pages/Home/NotFound";



const App = () => {

  const { movies, loading, searchTerm, setSearchTerm, genres,failed,filteredCount,totalMovies} = useMovies();



  return (

    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index 
                                  movies = {movies} 
                                  loading = {loading} 
                                  searchTerm = {searchTerm} 
                                  setSearchTerm = {setSearchTerm}
                                  genres = {genres}
                                  failed = {failed}
                                  filteredCount={filteredCount}
                                  totalMovies={totalMovies}  />} />
          <Route path="/:id" element={<MoviePage />} />
          <Route path="*" element={<NotFound />}  />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
};

export default App;
