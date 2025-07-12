
import { Film } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <Film className="h-8 w-8 text-purple-300" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            MovieMind
          </h1>
        </div>
        <p className="text-center text-purple-200 mt-2 text-sm">
          Discover your next favorite movie
        </p>
      </div>
    </header>
  );
};

export default Header;
