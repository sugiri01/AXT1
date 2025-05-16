
import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/layout/Card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { SkillsDistribution } from '@/components/dashboard/SkillsDistribution';
import { TopSkills } from '@/components/dashboard/TopSkills';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { RecommendedPath } from '@/components/dashboard/RecommendedPath';
import { AIAssistant } from '@/components/dashboard/AIAssistant';
import { Clock, BookOpen, Zap, Award } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Dashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <PageContainer
          title="Welcome back, Alex"
          description="Continue your learning journey where you left off."
        >
          <ProfileCard />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatsCard 
              icon={<Clock className="h-4 w-4" />} 
              title="Study Time"
              value="12.5 hrs"
              subtitle="Total study time this week"
              progress={75}
              trend={{ value: "2.3 hrs", positive: true }}
            />
            <StatsCard 
              icon={<BookOpen className="h-4 w-4" />} 
              title="Courses"
              value="3"
              subtitle="Active courses in progress"
            />
            <StatsCard 
              icon={<Zap className="h-4 w-4" />} 
              title="Skills"
              value="8"
              subtitle="New skills developed"
              trend={{ value: "2 skills", positive: true }}
            />
            <StatsCard 
              icon={<Award className="h-4 w-4" />} 
              title="Completed"
              value="24"
              subtitle="Modules completed this month"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-improved-visibility">Overall Completion</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-axelari-navy' : 'bg-gray-200'} rounded-full h-3`}>
                      <div className="h-full rounded-full progress-gradient" style={{ width: "68%" }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-axelari-teal"></span>
                          <span className="text-sm text-improved-visibility">Data Science Fundamentals</span>
                        </div>
                        <span className="text-sm font-medium">33%</span>
                      </div>
                      <div className={`w-full ${isDark ? 'bg-axelari-navy' : 'bg-gray-200'} rounded-full h-2`}>
                        <div className="h-full rounded-full bg-axelari-teal" style={{ width: "33%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-axelari-purple"></span>
                          <span className="text-sm text-improved-visibility">Deep Learning Specialization</span>
                        </div>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className={`w-full ${isDark ? 'bg-axelari-navy' : 'bg-gray-200'} rounded-full h-2`}>
                        <div className="h-full rounded-full bg-axelari-purple" style={{ width: "65%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          <span className="text-sm text-improved-visibility">Data Visualization Mastery</span>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className={`w-full ${isDark ? 'bg-axelari-navy' : 'bg-gray-200'} rounded-full h-2`}>
                        <div className="h-full rounded-full bg-blue-400" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <SkillsDistribution />
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended Learning Paths</h2>
              <a href="/learning-paths" className="text-axelari-teal hover:underline text-sm">View all</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RecommendedPath 
                title="Data Science Fundamentals" 
                description="Master the basics of data analysis, visualization and machine learning."
                progress={33}
                hours={28}
                modules={12}
                level="Beginner"
              />
              <RecommendedPath 
                title="Advanced Python for AI" 
                description="Learn Python programming for artificial intelligence applications."
                progress={0}
                hours={24}
                modules={10}
                level="Intermediate"
              />
              <RecommendedPath 
                title="Deep Learning Specialization" 
                description="Dive deep into neural networks and deep learning applications."
                progress={65}
                hours={36}
                modules={15}
                level="Advanced"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIAssistant />
            </div>
            <TopSkills />
          </div>
        </PageContainer>
      </div>
    </div>
  );
};

export default Dashboard;
