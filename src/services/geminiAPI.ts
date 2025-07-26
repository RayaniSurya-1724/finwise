import { toast } from "@/hooks/use-toast";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_PRO_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const GEMINI_FLASH_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

type GeminiResponse = {
  success: boolean;
  content: string;
  error?: string;
};

const getLanguagePrompt = (language: string) => {
  const basePrompt = `You are an AI-powered Financial Assistant designed to help users with all kinds of personal finance, investment, and savings-related questions.

You must answer **any financial question** in a clear, structured, and detailed manner. Your knowledge should cover:

1. Investment Options:
   - Mutual Funds (SIP & Lump sum)
   - Gold ETFs
   - Stocks
   - Bonds
   - Fixed Deposits (FDs)
   - PPF, NPS, ELSS

2. Financial Planning:
   - Goal-based investing
   - Tax-saving strategies
   - Emergency funds
   - Retirement planning

3. Budgeting & Saving:
   - Monthly expense tracking
   - Smart savings tips
   - Building a ₹5 lakh or ₹10 lakh corpus

4. Market Analysis:
   - Explain charts or uploaded images (optional)
   - Predict trends (basic insights)
   - Compare investment tools

📌 RESPONSE FORMAT:
1. **Understanding the Question:** Rephrase and understand the user's goal.
2. **Solution:** Provide a step-by-step solution.
3. **Calculations/Projections (if needed).**
4. **Recommendations:** What the user should do next.
5. **Risks:** Mention any risks or conditions.
6. **Disclaimer:** _"Investments are subject to market risks. Always consult a certified financial advisor."_

If an image is uploaded and relevant, analyze it. If not financial, say so.
If the question is vague, ask clarifying questions first.`;

  const languageInstructions = {
    'en': '',
    'hi': '\n\n**IMPORTANT: Please respond completely in Hindi (हिंदी). Use Devanagari script for all your responses. Translate all financial terms appropriately.**',
    'te': '\n\n**IMPORTANT: Please respond completely in Telugu (తెలుగు). Use Telugu script for all your responses. Translate all financial terms appropriately.**'
  };

  return basePrompt + (languageInstructions[language as keyof typeof languageInstructions] || '');
};

export const GeminiAPI = {
  async generateResponse(prompt: string, context?: string, language: string = 'en'): Promise<GeminiResponse> {
    try {
      const languagePrompt = getLanguagePrompt(language);
      const completePrompt = context 
        ? `${languagePrompt}\n\nContext: ${context}\n\nUser Question: ${prompt}`
        : `${languagePrompt}\n\nUser Question: ${prompt}`;
      
      console.log("Sending request to Gemini API with prompt length:", completePrompt.length);
      console.log("Using API key:", GEMINI_API_KEY.substring(0, 10) + "...");
      
      // Try Gemini Pro first, then fallback to Flash if that fails
      const endpoints = [
        { url: GEMINI_PRO_URL, name: 'Gemini Pro' },
        { url: GEMINI_FLASH_URL, name: 'Gemini Flash' }
      ];
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying ${endpoint.name}...`);
          const response = await fetch(`${endpoint.url}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: completePrompt
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              },
              safetySettings: [
                {
                  category: "HARM_CATEGORY_HARASSMENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_HATE_SPEECH",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
              ]
            })
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`${endpoint.name} API response:`, data);
            
            // Extract the response text from Gemini API
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                            "I'm sorry, I couldn't generate a response at this time.";
            
            return {
              success: true,
              content
            };
          } else {
            console.warn(`${endpoint.name} failed with status ${response.status}, trying next endpoint...`);
            if (endpoint === endpoints[endpoints.length - 1]) {
              // This is the last endpoint, handle the error
              throw new Error(`All endpoints failed. Last status: ${response.status}`);
            }
            continue;
          }
        } catch (endpointError) {
          console.warn(`${endpoint.name} endpoint error:`, endpointError);
          if (endpoint === endpoints[endpoints.length - 1]) {
            throw endpointError;
          }
          continue;
        }
      }
      
      // This should never be reached, but just in case
      throw new Error('No endpoints available');
      
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Provide a fallback response instead of complete failure
      const fallbackResponse = language === 'hi' 
        ? "मुझे खुशी होगी कि मैं आपकी वित्तीय सहायता कर सकूं। कृपया अपना प्रश्न पूछें और मैं आपको सर्वोत्तम सलाह देने की कोशिश करूंगा।"
        : language === 'te'
        ? "నేను మీ ఆర్థిక సహాయం చేయడంలో సంతోషిస్తాను. దయచేసి మీ ప్రశ్న అడగండి మరియు నేను మీకు ఉత్తమ సలహా ఇవ్వడానికి ప్రయత్నిస్తాను."
        : "I'm having temporary connectivity issues with the AI service. However, I'm still here to help with your financial questions. Please try asking your question again, or I can provide general financial guidance.";
      
      toast({
        title: "Service Notice",
        description: "AI service temporarily unavailable. Providing fallback assistance.",
        variant: "default"
      });
      
      return {
        success: true,
        content: fallbackResponse,
        error: error instanceof Error ? error.message : "Service temporarily unavailable"
      };
    }
  }
};
