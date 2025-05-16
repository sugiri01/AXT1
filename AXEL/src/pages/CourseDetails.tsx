import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { learningPaths } from './LearningPaths';
import CourseHeader from '@/components/course/CourseHeader';
import CourseContent from '@/components/course/CourseContent';
import CourseSidebar from '@/components/course/CourseSidebar';
import LessonContent from '@/components/course/LessonContent';
import { Chapter, Section } from '@/types/course';

// Extended course curriculum data with lesson content
const courseCurriculum: Record<string, Section[]> = {
  'ds-fundamentals': [
    {
      id: 'basics',
      title: 'FUNDAMENTALS',
      lessonsCount: 6,
      chapters: [
        { 
          id: 'ch1', 
          title: 'Introduction to Data Science', 
          hasPreview: true,
          content: `
            <h2>Introduction to Data Science</h2>
            <p>Data science is an interdisciplinary field that uses scientific methods, algorithms, processes, and systems to extract knowledge and insights from structured and unstructured data.</p>
            
            <h3>What is Data Science?</h3>
            <p>Data Science combines mathematics, statistics, specialized programming, advanced analytics, artificial intelligence (AI), and machine learning with specific subject matter expertise to uncover actionable insights hidden in an organization's data.</p>
            
            <h3>Key Components:</h3>
            <ul>
              <li>Statistics and Probability</li>
              <li>Data Cleaning and Preprocessing</li>
              <li>Data Visualization</li>
              <li>Machine Learning</li>
              <li>Domain Knowledge</li>
            </ul>
            
            <p>This course will take you through each of these components and help you build a strong foundation in data science.</p>
          `
        },
        { 
          id: 'ch2', 
          title: 'Data Collection and Processing', 
          hasPreview: true,
          content: `
            <h2>Data Collection and Processing</h2>
            
            <p>Data collection and processing are fundamental steps in any data science project. The quality of your data directly impacts the quality of insights you can derive.</p>
            
            <h3>Data Collection Methods:</h3>
            <ul>
              <li>Surveys and Questionnaires</li>
              <li>Web Scraping</li>
              <li>APIs</li>
              <li>Sensors and IoT Devices</li>
              <li>Databases and Data Warehouses</li>
            </ul>
            
            <h3>Data Processing Steps:</h3>
            <ol>
              <li>Data Collection</li>
              <li>Data Cleaning</li>
              <li>Data Transformation</li>
              <li>Data Integration</li>
              <li>Data Reduction</li>
            </ol>
            
            <p>In this lesson, we'll explore the various methods of data collection and the steps involved in processing raw data into a format suitable for analysis.</p>
          `
        },
        { 
          id: 'ch3', 
          title: 'Exploratory Data Analysis',
          content: `
            <h2>Exploratory Data Analysis (EDA)</h2>
            
            <p>EDA is an approach to analyzing datasets to summarize their main characteristics, often with visual methods. It's typically the first step in data analysis, performed before formal modeling or hypothesis testing.</p>
            
            <h3>Purpose of EDA:</h3>
            <ul>
              <li>Spot anomalies and outliers</li>
              <li>Identify patterns and relationships</li>
              <li>Check assumptions for statistical tests</li>
              <li>Develop initial insights</li>
            </ul>
            
            <h3>Common EDA Techniques:</h3>
            <ol>
              <li>Summary Statistics (mean, median, standard deviation)</li>
              <li>Data Visualization (histograms, box plots, scatter plots)</li>
              <li>Correlation Analysis</li>
              <li>Dimensionality Reduction</li>
            </ol>
            
            <p>In this lesson, you'll learn how to apply various EDA techniques to uncover hidden patterns in your data.</p>
          `
        },
        { 
          id: 'ch4', 
          title: 'Data Visualization Basics',
          content: `
            <h2>Data Visualization Basics</h2>
            
            <p>Data visualization is the graphical representation of information and data. It provides an accessible way to see and understand trends, outliers, and patterns in data.</p>
            
            <h3>Why Data Visualization Matters:</h3>
            <ul>
              <li>Simplifies complex information</li>
              <li>Identifies patterns quickly</li>
              <li>Communicates insights effectively</li>
              <li>Supports decision-making</li>
            </ul>
            
            <h3>Common Visualization Types:</h3>
            <ol>
              <li>Bar Charts and Histograms</li>
              <li>Line Charts</li>
              <li>Scatter Plots</li>
              <li>Pie Charts</li>
              <li>Heatmaps</li>
              <li>Geographic Maps</li>
            </ol>
            
            <p>In this lesson, you'll learn the fundamentals of creating effective visualizations and choosing the right chart type for your data.</p>
          `
        },
        { 
          id: 'ch5', 
          title: 'Statistics for Data Science',
          content: `
            <h2>Statistics for Data Science</h2>
            
            <p>Statistics is the backbone of data science, providing the tools and methods to analyze, interpret, and draw conclusions from data.</p>
            
            <h3>Key Statistical Concepts:</h3>
            <ul>
              <li>Descriptive Statistics (mean, median, mode)</li>
              <li>Inferential Statistics</li>
              <li>Probability Distributions</li>
              <li>Hypothesis Testing</li>
              <li>Regression Analysis</li>
            </ul>
            
            <h3>Statistical Methods in Data Science:</h3>
            <ol>
              <li>Sampling</li>
              <li>Central Tendency and Dispersion</li>
              <li>Correlation and Causation</li>
              <li>Confidence Intervals</li>
              <li>p-values and Statistical Significance</li>
            </ol>
            
            <p>This lesson will help you develop a strong statistical foundation necessary for advanced data science techniques.</p>
          `
        },
        { 
          id: 'ch6', 
          title: 'Introduction to Machine Learning',
          content: `
            <h2>Introduction to Machine Learning</h2>
            
            <p>Machine Learning is a subset of artificial intelligence that enables systems to learn from data, identify patterns, and make decisions with minimal human intervention.</p>
            
            <h3>Types of Machine Learning:</h3>
            <ul>
              <li>Supervised Learning</li>
              <li>Unsupervised Learning</li>
              <li>Reinforcement Learning</li>
            </ul>
            
            <h3>Common Machine Learning Algorithms:</h3>
            <ol>
              <li>Linear Regression</li>
              <li>Logistic Regression</li>
              <li>Decision Trees</li>
              <li>Random Forests</li>
              <li>K-Means Clustering</li>
              <li>Neural Networks</li>
            </ol>
            
            <p>This lesson introduces the fundamental concepts of machine learning and prepares you for more advanced topics in the field.</p>
          `
        }
      ]
    },
    {
      id: 'intermediate',
      title: 'INTERMEDIATE',
      lessonsCount: 9,
      chapters: [
        { 
          id: 'ch7', 
          title: 'Advanced Data Structures',
          content: `
            <h2>Advanced Data Structures</h2>
            
            <p>This lesson explores sophisticated data structures used in data science applications, beyond basic arrays and lists.</p>
            
            <h3>Topics Covered:</h3>
            <ul>
              <li>Graphs and Network Data</li>
              <li>Trees and Hierarchical Structures</li>
              <li>Hash Tables and Dictionaries</li>
              <li>Sparse Matrices</li>
              <li>Time Series Data</li>
            </ul>
            
            <p>Understanding these advanced data structures is essential for efficiently handling complex data science problems.</p>
          `
        },
        { 
          id: 'ch8', 
          title: 'Data Cleaning and Preprocessing',
          content: `
            <h2>Data Cleaning and Preprocessing</h2>
            
            <p>Real-world data is often messy and requires significant cleaning and preprocessing before analysis.</p>
            
            <h3>Key Techniques:</h3>
            <ul>
              <li>Handling Missing Values</li>
              <li>Dealing with Outliers</li>
              <li>Feature Scaling and Normalization</li>
              <li>Encoding Categorical Variables</li>
              <li>Dimensionality Reduction</li>
            </ul>
            
            <p>This lesson provides practical approaches to transform raw, messy data into a format suitable for modeling and analysis.</p>
          `
        },
        { 
          id: 'ch9', 
          title: 'Feature Engineering',
          content: `
            <h2>Feature Engineering</h2>
            
            <p>Feature engineering is the process of using domain knowledge to extract features from raw data that make machine learning algorithms work better.</p>
            
            <h3>Techniques Covered:</h3>
            <ul>
              <li>Feature Creation and Transformation</li>
              <li>Feature Selection Methods</li>
              <li>Polynomial Features</li>
              <li>Interaction Features</li>
              <li>Time-based Features</li>
            </ul>
            
            <p>This lesson will show you how effective feature engineering can significantly improve the performance of your machine learning models.</p>
          `
        },
        { 
          id: 'ch10', 
          title: 'Supervised Learning Algorithms',
          content: `
            <h2>Supervised Learning Algorithms</h2>
            
            <p>Supervised learning is a type of machine learning where models are trained using labeled data to make predictions or decisions.</p>
            
            <h3>Algorithms Covered:</h3>
            <ul>
              <li>Linear and Logistic Regression</li>
              <li>Support Vector Machines</li>
              <li>Decision Trees and Random Forests</li>
              <li>Gradient Boosting Methods</li>
              <li>Neural Networks</li>
            </ul>
            
            <p>This lesson provides a comprehensive overview of supervised learning algorithms, their applications, strengths, and limitations.</p>
          `
        },
        { 
          id: 'ch11', 
          title: 'Unsupervised Learning',
          content: `
            <h2>Unsupervised Learning</h2>
            
            <p>Unsupervised learning is used to find patterns and structures in unlabeled data without explicit guidance.</p>
            
            <h3>Key Techniques:</h3>
            <ul>
              <li>Clustering Algorithms</li>
              <li>Dimensionality Reduction</li>
              <li>Association Rules</li>
              <li>Anomaly Detection</li>
              <li>Generative Models</li>
            </ul>
            
            <p>This lesson explores how unsupervised learning can reveal hidden patterns and structures in your data.</p>
          `
        },
        { 
          id: 'ch12', 
          title: 'Model Evaluation and Validation',
          content: `
            <h2>Model Evaluation and Validation</h2>
            
            <p>Proper evaluation and validation are critical for ensuring your machine learning models perform well on new, unseen data.</p>
            
            <h3>Topics Covered:</h3>
            <ul>
              <li>Train-Test Split</li>
              <li>Cross-Validation</li>
              <li>Metrics for Classification and Regression</li>
              <li>Overfitting and Underfitting</li>
              <li>Hyperparameter Tuning</li>
            </ul>
            
            <p>This lesson teaches you how to rigorously evaluate machine learning models and ensure their generalizability.</p>
          `
        }
      ]
    }
  ],
  'python-ai': [
    {
      id: 'basics',
      title: 'FUNDAMENTALS',
      lessonsCount: 6,
      chapters: [
        { 
          id: 'ch1', 
          title: 'Development Environment & Basic Python Syntax', 
          hasPreview: true,
          content: `
            <h2>Development Environment & Basic Python Syntax</h2>
            
            <p>Setting up your Python environment is the first step in your journey to becoming a Python programmer.</p>
            
            <h3>Environment Setup:</h3>
            <ul>
              <li>Installing Python</li>
              <li>Setting up a code editor (VSCode, PyCharm, Jupyter)</li>
              <li>Virtual environments and package management</li>
            </ul>
            
            <h3>Basic Syntax:</h3>
            <ul>
              <li>Variables and data types</li>
              <li>Basic operators</li>
              <li>Comments and documentation</li>
              <li>Print statements and output</li>
            </ul>
            
            <p>This lesson will guide you through setting up your Python environment and writing your first lines of Python code.</p>
          `
        },
        { 
          id: 'ch2', 
          title: 'Getting Started with Python', 
          hasPreview: true,
          content: `
            <h2>Getting Started with Python</h2>
            
            <p>Python is a high-level, interpreted programming language known for its simplicity and readability.</p>
            
            <h3>Key Features of Python:</h3>
            <ul>
              <li>Easy to learn and use</li>
              <li>Interpreted language (no compilation needed)</li>
              <li>Dynamically typed</li>
              <li>Extensive standard library</li>
              <li>Large and active community</li>
            </ul>
            
            <h3>Python Applications:</h3>
            <ul>
              <li>Web Development</li>
              <li>Data Analysis</li>
              <li>Machine Learning and AI</li>
              <li>Scientific Computing</li>
              <li>Automation and Scripting</li>
            </ul>
            
            <p>This lesson provides an introduction to Python's features and capabilities, setting the stage for your Python programming journey.</p>
          `
        },
        { 
          id: 'ch3', 
          title: 'Python Basics', 
          hasPreview: true,
          content: `
            <h2>Python Basics</h2>
            
            <p>Understanding the fundamentals of Python programming is essential for building more complex applications.</p>
            
            <h3>Basic Data Types:</h3>
            <ul>
              <li>Numbers (integers, floats)</li>
              <li>Strings</li>
              <li>Booleans</li>
              <li>Lists</li>
              <li>Dictionaries</li>
              <li>Tuples</li>
              <li>Sets</li>
            </ul>
            
            <h3>Simple Operations:</h3>
            <ul>
              <li>Mathematical operations</li>
              <li>String manipulation</li>
              <li>List and dictionary operations</li>
            </ul>
            
            <p>This lesson covers the basic building blocks of Python programming that you'll use in every program you write.</p>
          `
        },
        { 
          id: 'ch4', 
          title: 'Control Flow',
          content: `
            <h2>Control Flow</h2>
            
            <p>Control flow allows you to control the order in which statements are executed in your code.</p>
            
            <h3>Topics Covered:</h3>
            <ul>
              <li>Conditional statements (if, elif, else)</li>
              <li>Loops (for, while)</li>
              <li>Loop control statements (break, continue)</li>
              <li>Comprehensions (list, dict, set)</li>
            </ul>
            
            <p>This lesson will teach you how to make decisions in your code and execute statements repeatedly based on conditions.</p>
          `
        },
        { 
          id: 'ch5', 
          title: 'Functions and Modules',
          content: `
            <h2>Functions and Modules</h2>
            
            <p>Functions and modules help organize code for reusability and maintainability.</p>
            
            <h3>Functions:</h3>
            <ul>
              <li>Defining and calling functions</li>
              <li>Parameters and arguments</li>
              <li>Return values</li>
              <li>Lambda functions</li>
            </ul>
            
            <h3>Modules:</h3>
            <ul>
              <li>Importing modules</li>
              <li>Creating your own modules</li>
              <li>Standard library modules</li>
              <li>Third-party modules</li>
            </ul>
            
            <p>This lesson shows you how to structure your code efficiently using functions and modules.</p>
          `
        },
        { 
          id: 'ch6', 
          title: 'Working with Data',
          content: `
            <h2>Working with Data</h2>
            
            <p>Python excels at data manipulation, making it a favorite language for data analysis.</p>
            
            <h3>Topics Covered:</h3>
            <ul>
              <li>Reading and writing files</li>
              <li>Working with CSV, JSON, and other formats</li>
              <li>Introduction to data libraries (Pandas, NumPy)</li>
              <li>Basic data operations</li>
            </ul>
            
            <p>This lesson introduces you to data handling in Python, setting the foundation for more advanced data analysis.</p>
          `
        }
      ]
    },
    {
      id: 'intermediate',
      title: 'INTERMEDIATE',
      lessonsCount: 9,
      chapters: [
        { 
          id: 'ch7', 
          title: 'Advanced Data Structures',
          content: `
            <h2>Advanced Data Structures</h2>
            
            <p>This lesson explores sophisticated data structures used in data science applications, beyond basic arrays and lists.</p>
            
            <h3>Topics Covered:</h3>
            <ul>
              <li>Graphs and Network Data</li>
              <li>Trees and Hierarchical Structures</li>
              <li>Hash Tables and Dictionaries</li>
              <li>Sparse Matrices</li>
              <li>Time Series Data</li>
            </ul>
            
            <p>Understanding these advanced data structures is essential for efficiently handling complex data science problems.</p>
          `
        },
        { 
          id: 'ch8', 
          title: 'Data Cleaning and Preprocessing',
          content: `
            <h2>Data Cleaning and Preprocessing</h2>
            
            <p>Real-world data is often messy and requires significant cleaning and preprocessing before analysis.</p>
            
            <h3>Key Techniques:</h3>
            <ul>
              <li>Handling Missing Values</li>
              <li>Dealing with Outliers</li>
              <li>Feature Scaling and Normalization</li>
              <li>Encoding Categorical Variables</li>
              <li>Dimensionality Reduction</li>
            </ul>
            
            <p>This lesson provides practical approaches to transform raw, messy data into a format suitable for modeling and analysis.</p>
          `
        },
        { 
          id: 'ch9', 
          title: 'Feature Engineering',
          content: `
            <h2>Feature Engineering</h2>
            
            <p>Feature engineering is the process of using domain knowledge to extract features from raw data that make machine learning algorithms work better.</p>
            
            <h3>Techniques Covered:</h3>
            <ul>
              <li>Feature Creation and Transformation</li>
              <li>Feature Selection Methods</li>
              <li>Polynomial Features</li>
              <li>Interaction Features</li>
              <li>Time-based Features</li>
            </ul>
            
            <p>This lesson will show you how effective feature engineering can significantly improve the performance of your machine learning models.</p>
          `
        },
        { 
          id: 'ch10', 
          title: 'Supervised Learning Algorithms',
          content: `
            <h2>Supervised Learning Algorithms</h2>
            
            <p>Supervised learning is a type of machine learning where models are trained using labeled data to make predictions or decisions.</p>
            
            <h3>Algorithms Covered:</h3>
            <ul>
              <li>Linear and Logistic Regression</li>
              <li>Support Vector Machines</li>
              <li>Decision Trees and Random Forests</li>
              <li>Gradient Boosting Methods</li>
              <li>Neural Networks</li>
            </ul>
            
            <p>This lesson provides a comprehensive overview of supervised learning algorithms, their applications, strengths, and limitations.</p>
          `
        },
        { 
          id: 'ch11', 
          title: 'Unsupervised Learning',
          content: `
            <h2>Unsupervised Learning</h2>
            
            <p>Unsupervised learning is used to find patterns and structures in unlabeled data without explicit guidance.</p>
            
            <h3>Key Techniques:</h3>
            <ul>
              <li>Clustering Algorithms</li>
              <li>Dimensionality Reduction</li>
              <li>Association Rules</li>
              <li>Anomaly Detection</li>
              <li>Generative Models</li>
            </ul>
            
            <p>This lesson explores how unsupervised learning can reveal hidden patterns and structures in your data.</p>
          `
        },
        { 
          id: 'ch12', 
          title: 'Model Evaluation and Validation',
          content: `
            <h2>Model Evaluation and Validation</h2>
            
            <p>Proper evaluation and validation are critical for ensuring your machine learning models perform well on new, unseen data.</p>
            
            <h3>Topics Covered:</h3>
            <ul>
              <li>Train-Test Split</li>
              <li>Cross-Validation</li>
              <li>Metrics for Classification and Regression</li>
              <li>Overfitting and Underfitting</li>
              <li>Hyperparameter Tuning</li>
            </ul>
            
            <p>This lesson teaches you how to rigorously evaluate machine learning models and ensure their generalizability.</p>
          `
        }
      ]
    },
    {
      id: 'expert',
      title: 'EXPERT',
      lessonsCount: 3,
      chapters: [
        { id: 'ch13', title: 'Metaclasses' },
        { id: 'ch14', title: 'Decorators' },
        { id: 'ch15', title: 'Coroutines and Asyncio' },
      ]
    }
  ],
  'deep-learning': [
    {
      id: 'basics',
      title: 'FUNDAMENTALS',
      lessonsCount: 5,
      chapters: [
        { id: 'ch1', title: 'Neural Networks Fundamentals' },
        { id: 'ch2', title: 'Deep Learning Frameworks' },
        { id: 'ch3', title: 'Building Your First Neural Network' },
      ]
    },
    {
      id: 'advanced',
      title: 'ADVANCED TECHNIQUES',
      lessonsCount: 7,
      chapters: [
        { id: 'ch4', title: 'Convolutional Neural Networks' },
        { id: 'ch5', title: 'Recurrent Neural Networks' },
        { id: 'ch6', title: 'Generative Adversarial Networks' },
        { id: 'ch7', title: 'Transfer Learning' },
      ]
    },
  ]
};

// Default curriculum with lesson content for paths that don't have specific content
const defaultCurriculum: Section[] = [
  {
    id: 'basics',
    title: 'FUNDAMENTALS',
    lessonsCount: 6,
    chapters: [
      { 
        id: 'ch1', 
        title: 'Getting Started', 
        hasPreview: true,
        content: `
          <h2>Getting Started</h2>
          <p>This is the first lesson in our course. Here you will learn the fundamental concepts needed to build a strong foundation.</p>
          
          <h3>Key Objectives:</h3>
          <ul>
            <li>Understanding the basic principles</li>
            <li>Setting up your learning environment</li>
            <li>Getting familiar with key terminology</li>
          </ul>
          
          <p>By the end of this lesson, you'll be ready to tackle more advanced topics with confidence.</p>
        `
      },
      { 
        id: 'ch2', 
        title: 'Core Concepts', 
        hasPreview: true,
        content: `
          <h2>Core Concepts</h2>
          <p>This lesson covers the essential concepts that form the backbone of this field of study.</p>
          
          <h3>Topics Covered:</h3>
          <ul>
            <li>Theoretical frameworks</li>
            <li>Practical applications</li>
            <li>Historical context and development</li>
          </ul>
          
          <p>Understanding these core concepts will allow you to approach more complex topics with a solid foundation.</p>
        `
      },
      { 
        id: 'ch3', 
        title: 'Basic Techniques',
        content: `
          <h2>Basic Techniques</h2>
          <p>Learn the fundamental techniques that professionals use every day in this field.</p>
          
          <h3>What You'll Learn:</h3>
          <ul>
            <li>Step-by-step approaches to common problems</li>
            <li>Best practices for implementation</li>
            <li>Troubleshooting common issues</li>
          </ul>
          
          <p>These techniques will form the building blocks for more advanced methods you'll learn later.</p>
        `
      },
      { 
        id: 'ch4', 
        title: 'Practical Applications',
        content: `
          <h2>Practical Applications</h2>
          <p>See how the concepts you've learned are applied in real-world scenarios.</p>
          
          <h3>Case Studies:</h3>
          <ul>
            <li>Industry examples</li>
            <li>Success stories and lessons learned</li>
            <li>Practical exercises to reinforce learning</li>
          </ul>
          
          <p>This lesson bridges the gap between theory and practice, showing you how to apply your knowledge effectively.</p>
        `
      }
    ]
  },
  {
    id: 'advanced',
    title: 'ADVANCED',
    lessonsCount: 5,
    chapters: [
      { 
        id: 'ch5', 
        title: 'Advanced Concepts',
        content: `
          <h2>Advanced Concepts</h2>
          <p>This lesson takes your understanding to the next level with more sophisticated concepts and approaches.</p>
          
          <h3>Topics Explored:</h3>
          <ul>
            <li>Cutting-edge developments in the field</li>
            <li>Complex problem-solving strategies</li>
            <li>Integrating multiple concepts for comprehensive solutions</li>
          </ul>
          
          <p>These advanced concepts will set you apart and prepare you for expert-level work.</p>
        `
      },
      { 
        id: 'ch6', 
        title: 'Professional Techniques',
        content: `
          <h2>Professional Techniques</h2>
          <p>Learn the advanced techniques used by industry professionals to solve complex problems.</p>
          
          <h3>What You'll Master:</h3>
          <ul>
            <li>Specialized methodologies</li>
            <li>Efficiency optimizations</li>
            <li>High-performance implementations</li>
          </ul>
          
          <p>These professional techniques will elevate your skills to match those used in professional environments.</p>
        `
      },
      { 
        id: 'ch7', 
        title: 'Real-world Case Studies',
        content: `
          <h2>Real-world Case Studies</h2>
          <p>Analyze actual projects and scenarios to deepen your understanding and problem-solving abilities.</p>
          
          <h3>Case Studies Include:</h3>
          <ul>
            <li>Major industry projects</li>
            <li>Challenging problem scenarios</li>
            <li>Success stories and failure analyses</li>
          </ul>
          
          <p>These case studies will help you understand how to apply your knowledge in complex, real-world situations.</p>
        `
      }
    ]
  }
];

const CourseDetails: React.FC = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<Chapter | null>(null);
  const [showLessonContent, setShowLessonContent] = useState(false);

  // Find the learning path based on the pathId
  const path = learningPaths.find(path => path.id === pathId);
  
  if (!path) {
    return (
      <PageContainer title="Course Not Found">
        <p>The requested course could not be found.</p>
        <button 
          onClick={() => navigate('/learning-paths')}
          className="mt-4 px-4 py-2 bg-axelari-navy-light text-white rounded-md hover:bg-axelari-navy-light/80"
        >
          Return to Learning Paths
        </button>
      </PageContainer>
    );
  }

  // Get curriculum data or use default
  const curriculum = courseCurriculum[path.id] || defaultCurriculum;

  const viewLesson = (chapter: Chapter) => {
    setSelectedLesson(chapter);
    setShowLessonContent(true);
  };

  const closeLessonView = () => {
    setShowLessonContent(false);
    setSelectedLesson(null);
  };

  if (showLessonContent && selectedLesson) {
    return (
      <PageContainer title={selectedLesson.title} description={`${path.title} - Lesson`}>
        <LessonContent 
          selectedLesson={selectedLesson}
          pathTitle={path.title}
          onClose={closeLessonView}
        />
      </PageContainer>
    );
  }
  
  return (
    <PageContainer title={path.title} description={path.description}>
      <CourseHeader 
        title={path.title} 
        description={path.description}
        level={path.level}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <CourseContent
            title={path.title}
            description={path.description}
            level={path.level}
            hours={path.hours}
            modules={path.modules}
            curriculum={curriculum}
            onViewLesson={viewLesson}
          />
        </div>

        <div>
          <CourseSidebar
            progress={path.progress}
            hours={path.hours}
            modules={path.modules}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default CourseDetails;
