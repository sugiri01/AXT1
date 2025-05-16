
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart3, Brain, PuzzleIcon, TestTube, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: BarChart3 },
  { name: 'Psychometric Test', path: '/psychometric-test', icon: TestTube },
  { name: 'Learning Paths', path: '/learning-paths', icon: BookOpen },
  { name: 'AI Assistant', path: '/ai-assistant', icon: Brain },
  { name: 'Skills Map', path: '/skills-map', icon: PuzzleIcon },
];

export const Navbar: React.FC = () => {
  const [activePath, setActivePath] = React.useState(window.location.pathname);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  React.useEffect(() => {
    const updateActivePath = () => {
      setActivePath(window.location.pathname);
    };
    
    window.addEventListener('popstate', updateActivePath);
    
    return () => {
      window.removeEventListener('popstate', updateActivePath);
    };
  }, []);

  return (
    <header className={`${isDark ? 'bg-axelari-navy/90 backdrop-blur-md border-b border-white/10' : 'bg-white/90 backdrop-blur-md border-b border-gray-200'} py-4 px-6 sticky top-0 z-50`}>
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 text-gradient font-bold text-xl" onClick={() => setActivePath('/')}>
            <BookOpen className="h-6 w-6" />
            Axelari.AI
          </Link>
          
          <nav>
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded-md transition-colors",
                      activePath === item.path 
                        ? "text-axelari-teal" 
                        : isDark 
                          ? "text-white hover:text-white" 
                          : "text-gray-700 hover:text-gray-900"
                    )}
                    onClick={() => setActivePath(item.path)}
                  >
                    <item.icon className={`h-4 w-4 ${activePath === item.path ? "text-axelari-teal" : ""}`} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className={`p-2 rounded-full transition-colors ${isDark ? 'text-white hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
            <Search className="h-5 w-5" />
          </button>
          <Link 
            to="/profile" 
            className={`flex items-center gap-2 rounded-full p-1 pl-3 border hover:border-axelari-teal transition-colors ${
              isDark 
                ? 'bg-axelari-navy-light text-white border-white/10' 
                : 'bg-gray-100 text-gray-800 border-gray-200'
            }`}
          >
            <span>Alex</span>
            <div className="w-8 h-8 bg-axelari-purple rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
