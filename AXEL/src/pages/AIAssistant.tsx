
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/layout/Card';
import { SendHorizontal, MessageSquare, Lightbulb, Book, LineChart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { askGemini } from '@/services/geminiService';
import { toast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! I'm your Axelari AI assistant powered by Gemini. I'm here to help with your learning journey. What would you like to explore today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    
    if (!inputText.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputText
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Get response from Gemini
      const aiResponse = await askGemini(inputText);
      
      // Add AI response
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <PageContainer
          title="AI Learning Assistant"
          description="Your personal AI tutor to guide you through your learning journey"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-[calc(100vh-240px)]">
                  <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-6">
                    {messages.map((message, index) => (
                      <div key={index} className={message.role === 'user' ? "flex justify-end gap-4" : "flex gap-4"}>
                        {message.role === 'assistant' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-axelari-teal rounded-full flex items-center justify-center text-white font-bold text-xs">
                            AI
                          </div>
                        )}
                        <div className={`flex-1 p-4 rounded-lg ${
                          message.role === 'user' 
                            ? "rounded-tr-none bg-axelari-teal/20 border border-axelari-teal/30 text-right" 
                            : `rounded-tl-none ${isDark ? 'bg-axelari-navy-light' : 'bg-gray-100'}`
                        }`}>
                          {message.role === 'user' ? (
                            <p className={isDark ? 'text-white' : 'text-gray-800'}>
                              {message.content}
                            </p>
                          ) : (
                            <div 
                              className={`text-left ${isDark ? 'text-white' : 'text-gray-800'} ai-response`}
                              dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
                            />
                          )}
                        </div>
                        {message.role === 'user' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-axelari-purple rounded-full flex items-center justify-center text-white font-bold text-xs">
                            A
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <form onSubmit={handleSubmit} className="relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className={`w-full ${
                        isDark 
                          ? 'bg-axelari-navy text-white placeholder:text-gray-500 border-axelari-navy-light' 
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
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`flex gap-4 p-3 rounded-lg ${isDark ? 'bg-axelari-navy-light/50 hover:bg-axelari-navy-light' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center`}>
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Answer Questions</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Get explanations on complex topics</p>
                    </div>
                  </div>
                  
                  <div className={`flex gap-4 p-3 rounded-lg ${isDark ? 'bg-axelari-navy-light/50 hover:bg-axelari-navy-light' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${isDark ? 'bg-axelari-teal/20' : 'bg-cyan-100'} flex items-center justify-center`}>
                      <Lightbulb className="h-5 w-5 text-axelari-teal" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Learning Path Recommendations</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Get personalized learning suggestions</p>
                    </div>
                  </div>
                  
                  <div className={`flex gap-4 p-3 rounded-lg ${isDark ? 'bg-axelari-navy-light/50 hover:bg-axelari-navy-light' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${isDark ? 'bg-axelari-purple/20' : 'bg-purple-100'} flex items-center justify-center`}>
                      <Book className="h-5 w-5 text-axelari-purple" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Summarize Content</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Get concise summaries of learning materials</p>
                    </div>
                  </div>
                  
                  <div className={`flex gap-4 p-3 rounded-lg ${isDark ? 'bg-axelari-navy-light/50 hover:bg-axelari-navy-light' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center`}>
                      <LineChart className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Skill Assessment</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Evaluate your progress and identify gaps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`flex items-center gap-3 p-2 rounded-md ${isDark ? 'hover:bg-axelari-navy-light' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}>
                    <div className="w-2 h-2 rounded-full bg-axelari-teal"></div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Machine Learning Fundamentals</span>
                  </div>
                  <div className={`flex items-center gap-3 p-2 rounded-md ${isDark ? 'hover:bg-axelari-navy-light' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}>
                    <div className="w-2 h-2 rounded-full bg-axelari-purple"></div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Neural Networks Architecture</span>
                  </div>
                  <div className={`flex items-center gap-3 p-2 rounded-md ${isDark ? 'hover:bg-axelari-navy-light' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}>
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Python for Data Analysis</span>
                  </div>
                  <div className={`flex items-center gap-3 p-2 rounded-md ${isDark ? 'hover:bg-axelari-navy-light' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Career Path: Data Scientist</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
};

export default AIAssistant;
