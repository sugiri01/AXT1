
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import Index from "./pages/Index";
import LearningPaths from "./pages/LearningPaths";
import CourseDetails from "./pages/CourseDetails";
import AIAssistant from "./pages/AIAssistant";
import SkillsMap from "./pages/SkillsMap";
import PsychometricTest from "./pages/PsychometricTest";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/learning-paths" element={<LearningPaths />} />
                  <Route path="/learning-paths/:pathId" element={<CourseDetails />} />
                  <Route path="/learning-paths/category/:category" element={<LearningPaths />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/skills-map" element={<SkillsMap />} />
                  <Route path="/psychometric-test" element={<PsychometricTest />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
