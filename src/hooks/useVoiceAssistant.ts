
import { useState, useCallback } from 'react';
import { voiceService } from '@/services/voiceService';
import { toast } from 'sonner';

export const useVoiceAssistant = (language: string = 'en') => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const startListening = useCallback(async (): Promise<string> => {
    if (!voiceService.isSupported()) {
      toast.error('Voice recognition requires Chrome/Edge browser on HTTPS or localhost');
      return '';
    }

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      const transcript = await voiceService.startListening(language);
      toast.success('Voice input received');
      return transcript;
    } catch (error) {
      console.error('Voice recognition error:', error);
      toast.error('Failed to recognize speech. Please try again.');
      return '';
    } finally {
      setIsListening(false);
    }
  }, [language]);

  const stopListening = useCallback(() => {
    voiceService.stopListening();
    setIsListening(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;

    try {
      setIsSpeaking(true);
      await voiceService.speak(text, language);
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast.error('Failed to speak response');
    } finally {
      setIsSpeaking(false);
    }
  }, [language]);

  const stopSpeaking = useCallback(() => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  }, []);

  return {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSupported: voiceService.isSupported()
  };
};
