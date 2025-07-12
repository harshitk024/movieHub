
import { Film, Bookmark, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary/20 via-primary/10 to-background border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              MovieMind
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-primary/10">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Watchlist</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <p className="text-center text-muted-foreground mt-2 text-sm">
          Discover your next favorite movie
        </p>
      </div>
    </header>
  );
};

export default Header;
