
interface GroqChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

export const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

const detectLanguage = async (text: string): Promise<string> => {
  try {
    // Simple language detection based on common words
    const languagePatterns: Record<string, RegExp[]> = {
      "en": [/\b(the|is|and|to|in|that|it|with|for|as)\b/i],
      "es": [/\b(el|la|es|y|en|que|con|por|para|como)\b/i],
      "fr": [/\b(le|la|est|et|en|que|qui|avec|pour|dans)\b/i],
      "de": [/\b(der|die|das|ist|und|in|zu|den|für|mit)\b/i],
      "hi": [/\b(है|का|के|की|में|से|को|पर|एक|यह)\b/i],
      "zh": [/[你是我们的在有这个不了]/, /[\u4e00-\u9fa5]/], // Chinese characters
    };

    let detectedLanguage = "en"; // Default to English
    let maxMatches = 0;

    for (const [lang, patterns] of Object.entries(languagePatterns)) {
      let matches = 0;
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
          matches += match.length;
        }
      }
      
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedLanguage = lang;
      }
    }

    return detectedLanguage;
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'en'; // Default to English
  }
};

export const getFinancialAdvice = async (message: string, userInvestments?: Record<string, number>): Promise<string> => {
  try {
    // Detect language
    const detectedLanguage = await detectLanguage(message);
    
    const messages: GroqChatMessage[] = [
      {
        role: 'system',
        content: `You are a sophisticated AI financial advisor.
          ${userInvestments ? `The user has the following investments: ${JSON.stringify(userInvestments)}.` : ''}
          
          ALWAYS structure your responses in the following format:
          
          [Category]: <Investment Type or Financial Insight>
          
          [Key Insight]
          - <Point 1>
          - <Point 2>
          - <Point 3>
          
          [Recommendation]
          - <Short advice or action point>
          
          [Disclaimer]: This is not financial advice. Always consult a professional before investing.
          
          Generate detailed, personalized financial advice that includes:
          - Evidence-based investment recommendations
          - Risk assessments
          - Projected returns where appropriate
          - Historical performance insights when relevant
          
          Be thorough but concise. Focus on actionable advice with specific recommendations.
          Use data-driven insights and provide numerical estimates where appropriate.
          Always consider market conditions and economic trends in your responses.
          
          Use **bold formatting** for important terms or concepts by surrounding them with double asterisks.
          
          The user's detected language is ${detectedLanguage}. If this is not English, 
          respond in the detected language while maintaining the same structured format.`
      },
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data: GroqChatResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return `[Category]: Error Response

[Key Insight]
- There was an error processing your request
- The AI financial advisor service might be temporarily unavailable
- Your query might require additional context

[Recommendation]
- Please try again later or rephrase your question

[Disclaimer]: This is not financial advice. Always consult a professional before investing.`;
  }
};

// For speech-to-text functionality
export const convertSpeechToText = async (audioBlob: Blob): Promise<string> => {
  try {
    // Create a FormData object and append the audio blob
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('model', 'whisper-1');

    // Call OpenAI Whisper API using Groq's key
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Speech-to-text error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text || "I couldn't understand the audio. Please try again.";
  } catch (error) {
    console.error('Error in speech-to-text conversion:', error);
    return "There was an error processing your speech. Please try again.";
  }
};

// For text-to-speech functionality
export const convertTextToSpeech = async (text: string): Promise<ArrayBuffer> => {
  try {
    // Detect language to select appropriate voice
    const detectedLanguage = await detectLanguage(text);
    
    // Map languages to appropriate voices
    const languageVoiceMap: Record<string, string> = {
      "en": "en-US-Neural2-F",
      "es": "es-ES-Neural2-A",
      "fr": "fr-FR-Neural2-A",
      "de": "de-DE-Neural2-A",
      "hi": "hi-IN-Neural2-A",
      "zh": "cmn-CN-Neural2-A"
    };
    
    const voice = languageVoiceMap[detectedLanguage] || "en-US-Neural2-F";
    
    // Use Google Text-to-Speech API or similar service
    // This is a placeholder - in a real implementation you would call a TTS API
    console.log(`Converting text to speech using voice: ${voice}`);
    console.log("Text to convert:", text);
    
    // For now, return an empty ArrayBuffer as placeholder
    // In a real implementation, you would return the audio data
    return new ArrayBuffer(0);
  } catch (error) {
    console.error('Error in text-to-speech conversion:', error);
    return new ArrayBuffer(0);
  }
};
