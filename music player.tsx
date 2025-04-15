import { useState, useEffect } from 'react';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = new Audio('/music.mp3');
    audioElement.loop = true;
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audio) return;

    try {
      setError('');
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setError('Failed to play audio. Please try again.');
      console.error('Error playing audio:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
      <IconButton
        onClick={toggleMusic}
        color="primary"
        disabled={isLoading || !audio}
      >
        {isLoading ? (
          <CircularProgress size={24} />
        ) : isPlaying ? (
          <VolumeUp />
        ) : (
          <VolumeOff />
        )}
      </IconButton>
      <Typography variant="body2" sx={{ ml: 1, color: error ? 'error.main' : 'inherit' }}>
        {error || (isPlaying ? 'Music ON' : 'Music OFF')}
      </Typography>
    </Box>
  );
};

export default MusicPlayer;