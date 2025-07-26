import { franc } from 'franc';

export interface LanguageDetectionResult {
  code: string;
  confidence: number;
  name: string;
}

// Mapping from franc language codes to our supported languages
const LANGUAGE_MAP: Record<string, { code: string; name: string }> = {
  'eng': { code: 'en', name: 'English' },
  'hin': { code: 'hi', name: 'Hindi' },
  'tel': { code: 'te', name: 'Telugu' },
  'spa': { code: 'es', name: 'Spanish' },
  'fra': { code: 'fr', name: 'French' },
  'deu': { code: 'de', name: 'German' },
  'ita': { code: 'it', name: 'Italian' },
  'por': { code: 'pt', name: 'Portuguese' },
  'rus': { code: 'ru', name: 'Russian' },
  'jpn': { code: 'ja', name: 'Japanese' },
  'kor': { code: 'ko', name: 'Korean' },
  'zho': { code: 'zh', name: 'Chinese' },
  'ara': { code: 'ar', name: 'Arabic' }
};

export const detectLanguage = (text: string): LanguageDetectionResult => {
  if (!text.trim()) {
    return { code: 'en', confidence: 0, name: 'English' };
  }

  try {
    // Use franc to detect the language
    const detected = franc(text);
    
    // Get the mapped language or default to English
    const mappedLang = LANGUAGE_MAP[detected] || LANGUAGE_MAP['eng'];
    
    // Calculate a simple confidence score based on text length and detection
    const confidence = detected === 'und' ? 0.1 : Math.min(0.9, text.length / 50);
    
    return {
      code: mappedLang.code,
      confidence,
      name: mappedLang.name
    };
  } catch (error) {
    console.warn('Language detection failed:', error);
    return { code: 'en', confidence: 0.1, name: 'English' };
  }
};

export const getSupportedLanguages = () => {
  return Object.values(LANGUAGE_MAP);
};

// Check if a language is supported for voice
export const isLanguageSupportedForVoice = (langCode: string): boolean => {
  const supportedVoiceLanguages = ['en', 'hi', 'te', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar'];
  return supportedVoiceLanguages.includes(langCode);
};