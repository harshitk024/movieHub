import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Home/Index";
import MoviePage from "./pages/Movie/Index";
import {useMovies}  from "./hooks/useMovies";
import NotFound from "./pages/Home/NotFound";
import LoginPage from "./pages/Login/index"
import { useUser } from "./hooks/useUser";
import WatchlistPage from "@/pages/Watchlist/Index"

const App = () => {

  const {state,dispatch,isUserLoading} = useUser()
  console.log(state.user)

  if(isUserLoading) {
    return <div></div>
  }


  return (

    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={state.user !== null ? <Index /> : <Navigate replace to = "/login" />} />
          <Route path="/:id" element={<MoviePage />} />
          <Route path="*" element={<NotFound />}  />
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/watchlist" element = {<WatchlistPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
};

export default App;
