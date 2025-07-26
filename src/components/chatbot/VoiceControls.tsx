
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  isSupported: boolean;
  disabled?: boolean;
  compact?: boolean;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  isSupported,
  disabled = false,
  compact = false
}) => {
  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      {/* Voice Input Control */}
      <Button
        type="button"
        size={compact ? "sm" : "icon"}
        variant={isListening ? "destructive" : "outline"}
        onClick={isListening ? onStopListening : onStartListening}
        disabled={disabled || isSpeaking}
        className={cn(
          "shrink-0",
          isListening && "animate-pulse",
          compact && "h-8 w-8"
        )}
        title={isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? (
          <MicOff className={cn("h-4 w-4", compact && "h-3 w-3")} />
        ) : (
          <Mic className={cn("h-4 w-4", compact && "h-3 w-3")} />
        )}
      </Button>

      {/* Voice Output Control */}
      {isSpeaking && (
        <Button
          type="button"
          size={compact ? "sm" : "icon"}
          variant="outline"
          onClick={onStopSpeaking}
          className={cn(
            "shrink-0 text-blue-600",
            "animate-pulse",
            compact && "h-8 w-8"
          )}
          title="Stop speaking"
        >
          <VolumeX className={cn("h-4 w-4", compact && "h-3 w-3")} />
        </Button>
      )}
    </div>
  );
};

export default VoiceControls;
