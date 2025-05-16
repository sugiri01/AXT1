
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/layout/Card';
import { SendHorizontal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { askGemini } from '@/services/geminiService';
import { toast } from '@/hooks/use-toast';

export const AIAssistant: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const formatContent = (content: string) => {
    // Replace ** text ** with bold text
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace line breaks with <br /> tags
    formatted = formatted.replace(/\n/g, '<br />');
    
    // Format bullet points
    formatted = formatted.replace(/\* (.*?)(<br \/>|$)/g, '<div class="flex gap-2 mb-1"><span class="flex-shrink-0">•</span><span>$1</span></div>$2');
    
    return formatted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await askGemini(message);
      setAiResponse(response);
    } catch (error) {
      console.error("Error with AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    setMessage('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-axelari-teal rounded-full h-6 w-6 flex items-center justify-center text-white font-bold text-xs">AI</span>
          AI Learning Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`mb-4 p-4 rounded-lg ${
          isDark 
            ? 'bg-axelari-navy-light border-axelari-navy-light' 
            : 'bg-gray-100 border-gray-200'
        } border`}>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-axelari-teal rounded-full h-6 w-6 flex items-center justify-center text-white font-bold text-xs">
              AI
            </div>
            <div className="font-medium">Axelari Assistant</div>
          </div>
          {aiResponse ? (
            <div 
              className={`text-left ${isDark ? 'text-white' : 'text-gray-700'} ai-response`} 
              dangerouslySetInnerHTML={{ __html: formatContent(aiResponse) }}
            />
          ) : (
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Hi there! I'm your Axelari AI assistant powered by Gemini. I'm here to help with your learning journey. What would you like to explore today?
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full ${
              isDark 
                ? 'bg-axelari-navy-light text-white placeholder:text-gray-500 border-axelari-navy-light' 
                : 'bg-gray-100 text-gray-800 placeholder:text-gray-500 border-gray-300'
              } rounded-full py-3 px-4 pr-12 border focus:border-axelari-teal outline-none`}
            placeholder="Ask me anything about your learning journey..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`absolute right-1 top-1/2 -translate-y-1/2 ${isLoading ? 'bg-gray-400' : 'bg-axelari-teal'} text-white rounded-full p-2 hover:bg-axelari-teal/80 transition-colors`}
            disabled={isLoading}
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {['Recommend a learning path for data science', 'Explain neural networks', 'What skills do I need for ML?'].map((suggestion, index) => (
            <button 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              className={`rounded-full px-3 py-1 text-sm ${
                isDark 
                  ? 'bg-axelari-navy text-gray-300 hover:bg-axelari-teal/20 hover:text-axelari-teal' 
                  : 'bg-gray-200 text-gray-700 hover:bg-axelari-teal/20 hover:text-axelari-teal'
                } transition-colors`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
