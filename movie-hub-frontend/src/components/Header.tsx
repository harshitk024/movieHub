
import { Film, Bookmark, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authContext';
import UserMenu from "./UserMenu"
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Header = () => {

  const navigate = useNavigate()
  const location = useLocation()


  const goToWatchlist = () => {

    navigate("/watchlist")

  }



  const {state} = useAuth();
  return (
    <header className="bg-gradient-to-r from-primary/20 via-primary/10 to-background border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              MoviesHub
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant='wishlist' size="sm" className={`flex items-center space-x-2  ${location.pathname === "/watchlist" ? "bg-primary text-white" : "hover:bg-primary/10"}`}>
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline" onClick={goToWatchlist}>Watchlist</span>
            </Button>

            <UserMenu />
            
           
            <div className='hover:cursor-pointer hover:underline'>
              {state.user.username}
            </div>
          </div>
        </div>
        
        {/* <p className="text-center text-muted-foreground mt-2 text-sm">
          Discover your next favorite movie
        </p> */}
      </div>
    </header>
  );
};

export default Header;
