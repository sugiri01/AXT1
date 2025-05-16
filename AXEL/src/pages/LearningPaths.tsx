
import React, { useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { BookOpen, Code, Database, BarChart2, Clock, Layers, Search, Filter } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  hours: number;
  modules: number;
  progress: number;
}

export const learningPaths: LearningPath[] = [
  {
    id: 'ds-fundamentals',
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data analysis, visualization and machine learning.',
    category: 'Data Science',
    level: 'Beginner',
    hours: 28,
    modules: 12,
    progress: 33
  },
  {
    id: 'python-ai',
    title: 'Advanced Python for AI',
    description: 'Learn Python programming for artificial intelligence applications.',
    category: 'AI & ML',
    level: 'Intermediate',
    hours: 24,
    modules: 10,
    progress: 0
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Specialization',
    description: 'Dive deep into neural networks and deep learning applications.',
    category: 'AI & ML',
    level: 'Advanced',
    hours: 36,
    modules: 15,
    progress: 65
  },
  {
    id: 'data-viz',
    title: 'Data Visualization Mastery',
    description: 'Create impactful visualizations to communicate insights effectively.',
    category: 'Data Science',
    level: 'Intermediate',
    hours: 18,
    modules: 8,
    progress: 20
  },
  {
    id: 'ml-engineering',
    title: 'Machine Learning Engineering',
    description: 'Learn to deploy and scale machine learning models in production.',
    category: 'AI & ML',
    level: 'Advanced',
    hours: 32,
    modules: 14,
    progress: 0
  },
  {
    id: 'data-ethics',
    title: 'Data Ethics and AI',
    description: 'Explore ethical considerations in AI and data science applications.',
    category: 'Data Science',
    level: 'Beginner',
    hours: 12,
    modules: 6,
    progress: 0
  },
  {
    id: 'web-development',
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript to build modern websites.',
    category: 'Programming',
    level: 'Beginner',
    hours: 24,
    modules: 10,
    progress: 0
  },
  {
    id: 'backend-dev',
    title: 'Backend Development',
    description: 'Master server-side programming and database management.',
    category: 'Programming',
    level: 'Intermediate',
    hours: 30,
    modules: 12,
    progress: 0
  },
  {
    id: 'career-communication',
    title: 'Professional Communication',
    description: 'Develop essential communication skills for career advancement.',
    category: 'Career Skills',
    level: 'Beginner',
    hours: 14,
    modules: 8,
    progress: 0
  },
  {
    id: 'leadership',
    title: 'Leadership and Management',
    description: 'Learn key leadership principles and team management strategies.',
    category: 'Career Skills',
    level: 'Intermediate',
    hours: 20,
    modules: 10,
    progress: 0
  }
];

const categories = ['All Paths', 'Data Science', 'Programming', 'AI & ML', 'Career Skills'];

const LearningPaths = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All Paths');
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    // Set selected category based on URL parameter
    if (category) {
      const formattedCategory = category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      if (categories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      }
    }
  }, [category]);
  
  const filteredPaths = selectedCategory === 'All Paths' 
    ? learningPaths
    : learningPaths.filter(path => path.category === selectedCategory);
  
  // Handle recommended path from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const recommendedPathId = params.get('recommended');
    
    if (recommendedPathId) {
      // Find the recommended path ID in our paths
      const path = learningPaths.find(p => p.id === recommendedPathId);
      
      if (path) {
        // Show a toast notification about the recommended path
        toast({
          title: "Recommended Path",
          description: `Viewing your recommended learning path: ${path.title}`,
        });
        
        // Scroll to recommended section (use a timeout to ensure DOM is ready)
        setTimeout(() => {
          const element = document.getElementById(`path-${recommendedPathId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-2', 'ring-axelari-teal', 'ring-opacity-70');
            
            // Remove highlight after a few seconds
            setTimeout(() => {
              element.classList.remove('ring-2', 'ring-axelari-teal', 'ring-opacity-70');
            }, 3000);
          }
        }, 300);
      }
    }
  }, [location.search, toast]);
  
  const handleCategoryCardClick = (category: string) => {
    const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/learning-paths/category/${formattedCategory}`);
  };

  // Helper function for level badge colors in light/dark mode
  const getLevelColor = (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
    if (isDark) {
      switch (level) {
        case 'Beginner':
          return 'bg-green-900/30 text-green-400 border-green-500/30';
        case 'Intermediate':
          return 'bg-blue-900/30 text-blue-400 border-blue-500/30';
        case 'Advanced':
          return 'bg-purple-900/30 text-purple-400 border-purple-500/30';
      }
    } else {
      switch (level) {
        case 'Beginner':
          return 'bg-green-100 text-green-700 border-green-300';
        case 'Intermediate':
          return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'Advanced':
          return 'bg-purple-100 text-purple-700 border-purple-300';
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <PageContainer
          title="Learning Paths"
          description="Explore curated learning paths designed to help you achieve your goals"
        >
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-axelari-teal text-white'
                      : isDark 
                        ? 'bg-axelari-navy-light text-gray-400 hover:bg-axelari-navy-light/80'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
              
              <div className="ml-auto flex gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search paths..."
                    className={`pl-10 pr-4 py-2 rounded-full text-sm ${
                      isDark 
                        ? 'bg-axelari-navy-light border-axelari-navy-light focus:border-axelari-teal' 
                        : 'bg-gray-100 border-gray-200 text-gray-800 focus:border-axelari-teal'
                    } border outline-none w-[220px]`}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                  isDark 
                    ? 'bg-axelari-navy-light text-gray-400 hover:bg-axelari-navy-light/80' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } transition-colors`}>
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>
            
            {selectedCategory === 'All Paths' && (
              <Card className={`mb-10 ${isDark ? 'gradient-border' : 'border-gray-200 bg-white'}`}>
                <CardContent className="flex flex-col lg:flex-row items-center gap-6 py-6">
                  <div className="flex-shrink-0">
                    <div className={`h-20 w-20 rounded-full flex items-center justify-center ${
                      isDark 
                        ? 'bg-axelari-teal/20 border border-axelari-teal/30' 
                        : 'bg-axelari-teal/10 border border-axelari-teal/20'
                      }`}>
                      <BookOpen className="h-10 w-10 text-axelari-teal" />
                    </div>
                  </div>
                  <div className="flex-grow text-center lg:text-left">
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? '' : 'text-gray-900'}`}>Recommended for you</h3>
                    <p className={isDark ? "text-gray-400 mb-4" : "text-gray-600 mb-4"}>Based on your skills and interests, we recommend the following learning path:</p>
                    <div className={`inline-flex items-center gap-2 ${
                      isDark 
                        ? 'bg-axelari-navy px-3 py-1 rounded-full text-sm font-medium text-axelari-teal border border-axelari-teal/30' 
                        : 'bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-axelari-teal border border-axelari-teal/30'
                      }`}>
                      <span className="w-2 h-2 rounded-full bg-axelari-teal"></span>
                      Data Science Fundamentals
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button 
                      className="px-6 py-2 bg-gradient-to-r from-axelari-teal to-axelari-purple text-white rounded-md font-medium hover:opacity-90 transition-opacity"
                      onClick={() => navigate('/learning-paths/ds-fundamentals')}
                    >
                      Continue Learning
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map(path => {
                const getCategoryIcon = () => {
                  switch (path.category) {
                    case 'Data Science':
                      return <Database className="h-5 w-5 text-axelari-teal" />;
                    case 'Programming':
                      return <Code className="h-5 w-5 text-axelari-purple" />;
                    case 'AI & ML':
                      return <BarChart2 className="h-5 w-5 text-blue-400" />;
                    case 'Career Skills':
                      return <BookOpen className="h-5 w-5 text-green-400" />;
                    default:
                      return <BookOpen className="h-5 w-5 text-axelari-teal" />;
                  }
                };
                
                return (
                  <div key={path.id} id={`path-${path.id}`}>
                    <Card className={`group hover:border-axelari-teal/50 transition-colors h-full flex flex-col ${isDark ? '' : 'bg-white border-gray-200'}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            isDark ? 'bg-axelari-navy-light' : 'bg-gray-100'
                          }`}>
                            {getCategoryIcon()}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(path.level)}`}>
                            {path.level}
                          </span>
                        </div>
                        <CardTitle className={`mt-3 ${isDark ? '' : 'text-gray-900'}`}>{path.title}</CardTitle>
                        <CardDescription className={isDark ? '' : 'text-gray-600'}>{path.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <div className="flex-1">
                          {path.progress > 0 ? (
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-1">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Progress</span>
                                <span className={`text-xs font-medium ${isDark ? '' : 'text-gray-700'}`}>{path.progress}%</span>
                              </div>
                              <ProgressBar value={path.progress} height="sm" />
                            </div>
                          ) : (
                            <div className="mb-4"></div>
                          )}
                          
                          <div className={`flex justify-between items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{path.hours} hours</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Layers className="h-4 w-4" />
                              <span>{path.modules} modules</span>
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          className={`w-full py-2 rounded-md ${
                            isDark 
                              ? 'bg-axelari-navy-light group-hover:bg-gradient-to-r group-hover:from-axelari-teal group-hover:to-axelari-purple' 
                              : 'bg-gray-200 text-gray-700 group-hover:bg-axelari-teal group-hover:text-white'
                            } font-medium transition-all duration-300`}
                          onClick={() => navigate(`/learning-paths/${path.id}`)}
                        >
                          {path.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                        </button>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? '' : 'text-gray-900'}`}>Discover Learning Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card 
                className={`${
                  isDark 
                    ? 'bg-gradient-to-br from-axelari-navy-light to-axelari-navy hover:from-axelari-teal/20 hover:to-axelari-navy-light' 
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                  } transition-colors cursor-pointer`}
                onClick={() => handleCategoryCardClick('Data Science')}
              >
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <Database className={`h-12 w-12 text-axelari-teal mb-4`} />
                  <h3 className={`text-xl font-bold mb-1 ${isDark ? '' : 'text-gray-900'}`}>Data Science</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>12 Learning Paths</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`${
                  isDark 
                    ? 'bg-gradient-to-br from-axelari-navy-light to-axelari-navy hover:from-axelari-purple/20 hover:to-axelari-navy-light' 
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                  } transition-colors cursor-pointer`}
                onClick={() => handleCategoryCardClick('Programming')}
              >
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <Code className="h-12 w-12 text-axelari-purple mb-4" />
                  <h3 className={`text-xl font-bold mb-1 ${isDark ? '' : 'text-gray-900'}`}>Programming</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>8 Learning Paths</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`${
                  isDark 
                    ? 'bg-gradient-to-br from-axelari-navy-light to-axelari-navy hover:from-blue-400/20 hover:to-axelari-navy-light' 
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                  } transition-colors cursor-pointer`}
                onClick={() => handleCategoryCardClick('AI & ML')}
              >
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <BarChart2 className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className={`text-xl font-bold mb-1 ${isDark ? '' : 'text-gray-900'}`}>AI & ML</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>15 Learning Paths</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`${
                  isDark 
                    ? 'bg-gradient-to-br from-axelari-navy-light to-axelari-navy hover:from-green-400/20 hover:to-axelari-navy-light' 
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                  } transition-colors cursor-pointer`}
                onClick={() => handleCategoryCardClick('Career Skills')}
              >
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <BookOpen className="h-12 w-12 text-green-400 mb-4" />
                  <h3 className={`text-xl font-bold mb-1 ${isDark ? '' : 'text-gray-900'}`}>Career Skills</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>6 Learning Paths</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className={`${
            isDark 
              ? 'bg-gradient-to-r from-axelari-teal/20 to-axelari-purple/20 border-axelari-teal/30' 
              : 'bg-gradient-to-r from-axelari-teal/10 to-axelari-purple/10 border-axelari-teal/20'
            }`}>
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-6">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? '' : 'text-gray-900'}`}>Can't find what you're looking for?</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Let our AI assistant help build a custom learning path tailored to your goals.</p>
              </div>
              <button 
                className={isDark 
                  ? 'px-6 py-3 bg-white text-axelari-navy font-medium rounded-md hover:bg-white/90 transition-colors whitespace-nowrap' 
                  : 'px-6 py-3 bg-axelari-teal text-white font-medium rounded-md hover:bg-axelari-teal/90 transition-colors whitespace-nowrap'
                }
                onClick={() => navigate('/ai-assistant')}
              >
                Create Custom Path
              </button>
            </CardContent>
          </Card>
        </PageContainer>
      </div>
    </div>
  );
};

export default LearningPaths;
