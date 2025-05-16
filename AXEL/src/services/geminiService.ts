
/**
 * Service for interacting with the Google Gemini API
 */

const GEMINI_API_KEY = "AIzaSyAc_JdIBzWO113OC6dnXFcFstR39i5_OEc";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: {
      category: string;
      probability: string;
    }[];
  };
}

/**
 * Format markdown text for better display
 * @param text The markdown text to format
 * @returns Formatted text with proper line breaks and formatting
 */
const formatMarkdownText = (text: string): string => {
  // Make sure headings have proper spacing
  let formatted = text.replace(/\*\*([^*]+)\*\*/g, '**$1**\n');
  
  // Ensure proper spacing for bullet points
  formatted = formatted.replace(/\n\s*\*\s/g, '\n* ');
  
  // Ensure paragraphs have proper spacing
  formatted = formatted.replace(/\n\n/g, '\n\n');
  
  // Clean up any excessive line breaks
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  return formatted;
};

/**
 * Sends a prompt to the Gemini API and returns the response
 * @param prompt The text prompt to send to Gemini
 * @returns The text response from Gemini
 */
export const askGemini = async (prompt: string): Promise<string> => {
  try {
    const requestBody: GeminiRequest = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    // Check if the response was blocked for safety reasons
    if (data.promptFeedback?.blockReason) {
      return `I'm unable to respond to that query due to content safety guidelines (${data.promptFeedback.blockReason}).`;
    }
    
    // Extract and format the response text
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
      const rawText = data.candidates[0].content.parts[0].text;
      return formatMarkdownText(rawText);
    } else {
      return "No response was generated.";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, there was an error connecting to the AI service. Please try again later.";
  }
};
