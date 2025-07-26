
export class VoiceService {
  private recognition: any | null = null;
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeRecognition();
    this.loadVoices();
  }

  private initializeRecognition() {
    // Check for browser support with proper fallbacks
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('❌ Speech Recognition not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
  }

  private loadVoices() {
    const updateVoices = () => {
      this.voices = this.synthesis.getVoices();
    };
    
    updateVoices();
    this.synthesis.onvoiceschanged = updateVoices;
  }

  public startListening(language: string = 'en'): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      console.log('🎤 Please speak something...');

      // Set language based on selection
      const languageMap: Record<string, string> = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'te': 'te-IN'
      };

      this.recognition.lang = languageMap[language] || 'en-US';
      
      // Enhanced settings for better recognition (inspired by Python code)
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 3; // Get multiple alternatives
      
      // Add timeout handling
      let timeoutId: NodeJS.Timeout;
      const LISTENING_TIMEOUT = 10000; // 10 seconds timeout

      this.recognition.onstart = () => {
        console.log('🧠 Speech recognition started, listening...');
        timeoutId = setTimeout(() => {
          this.recognition.stop();
          reject(new Error('Listening timeout. Please try again.'));
        }, LISTENING_TIMEOUT);
      };

      this.recognition.onresult = (event: any) => {
        clearTimeout(timeoutId);
        console.log('🧠 Recognizing speech...');
        
        // Get the best result from alternatives
        const results = event.results[0];
        let bestTranscript = '';
        let bestConfidence = 0;
        
        for (let i = 0; i < results.length; i++) {
          const alternative = results[i];
          if (alternative.confidence > bestConfidence) {
            bestConfidence = alternative.confidence;
            bestTranscript = alternative.transcript;
          }
        }
        
        const transcript = bestTranscript || results[0].transcript;
        console.log('📝 You said:', transcript, 'Confidence:', bestConfidence);
        
        if (transcript && transcript.trim()) {
          resolve(transcript);
        } else {
          reject(new Error('No clear speech detected. Please try again.'));
        }
      };

      this.recognition.onerror = (event: any) => {
        clearTimeout(timeoutId);
        console.error('❌ Speech recognition error:', event.error);
        let errorMessage = 'Speech recognition failed';
        
        switch (event.error) {
          case 'not-allowed':
            errorMessage = '❌ Microphone access denied. Please allow microphone access in your browser settings and try again.';
            break;
          case 'no-speech':
            errorMessage = '❌ No speech detected. Please speak clearly and try again.';
            break;
          case 'network':
            errorMessage = '⚠️ Network error. Please ensure you have a stable internet connection and try again.';
            break;
          case 'audio-capture':
            errorMessage = '⚠️ Microphone not found. Please check your microphone connection and try again.';
            break;
          case 'aborted':
            errorMessage = '⚠️ Speech recognition was cancelled.';
            break;
          case 'service-not-allowed':
            errorMessage = '❌ Speech recognition service not allowed. Please use Chrome/Edge browser on HTTPS or localhost.';
            break;
          case 'language-not-supported':
            errorMessage = '❌ Selected language not supported. Please try English.';
            break;
          default:
            errorMessage = `⚠️ Speech recognition error: ${event.error}. Please try again.`;
        }
        
        reject(new Error(errorMessage));
      };

      this.recognition.onend = () => {
        clearTimeout(timeoutId);
        console.log('🎤 Speech recognition ended');
      };

      // Start recognition without additional permission check (already handled in hook)
      try {
        this.recognition.start();
      } catch (error) {
        reject(new Error('Failed to start speech recognition: ' + error));
      }
    });
  }

  public stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  public speak(text: string, language: string = 'en'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!text.trim()) {
        resolve();
        return;
      }

      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select appropriate voice based on language
      const voiceMap: Record<string, string[]> = {
        'en': ['en-US', 'en-GB', 'en'],
        'hi': ['hi-IN', 'hi'],
        'te': ['te-IN', 'te']
      };

      const preferredVoices = voiceMap[language] || ['en-US'];
      const voice = this.voices.find(v => 
        preferredVoices.some(lang => v.lang.startsWith(lang))
      ) || this.voices.find(v => v.lang.startsWith('en'));

      if (voice) {
        utterance.voice = voice;
      }

      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));

      this.synthesis.speak(utterance);
    });
  }

  public stopSpeaking() {
    this.synthesis.cancel();
  }

  public isSupported(): boolean {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const isHTTPS = location.protocol === 'https:' || location.hostname === 'localhost';
    return !!(SpeechRecognition && this.synthesis && isHTTPS);
  }
}

export const voiceService = new VoiceService();
