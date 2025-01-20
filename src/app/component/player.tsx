'use client';

import React, { useEffect } from 'react';
import { Box, IconButton, Slider, Paper, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';

interface Song {
  id: number;
  name: string;
  lyrics: string;
  duration: number;
}

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  isHovered: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (event: Event, value: number | number[]) => void;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  isPlaying,
  progress,
  isHovered,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!currentSong) return null;

  return (
    <Paper
      elevation={3}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 850,
        height: 87,
        border: '1px solid rgba(44, 52, 60, 1)',
        borderRadius: '20px',
        backgroundColor: 'rgba(22, 25, 28, 0.69)',
        backdropFilter: 'blur(50px)',
        boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <Slider
        hidden={!isHovered}
        value={progress}
        max={currentSong.duration}
        onChange={onSeek}
        aria-labelledby="continuous-slider"
        sx={{
          '& .MuiSlider-track': {
            background: 'linear-gradient(90deg, rgba(170, 0, 255, 0) 0%, #AA00FF 100%)',
            boxShadow: '0px 0px 15px 0px rgba(170, 0, 255, 0.8)',
          },
          // Hide the rail
          '& .MuiSlider-rail': {
            backgroundColor: 'transparent',
          },
          width: '95%',
          top: -14,
          position: 'absolute',
          left: 21,
          borderRadius: 29,
          zIndex: 999999,
        }}
        slotProps={{
          thumb: {
            style: {
              height: 10,
              width: 10,
              border: 1,
              background: 'var(--Shades-Primary-1200, rgba(191, 194, 200, 1))',
            },
          },
        }}
      />
      <Box className="music-player-content">
        <Box className="music-player-left">
          <Box>
            <img src="playerIcon.png" alt="Album Art" className="album-art" />
          </Box>

          <Box>
            <Typography className="song-name">{currentSong.name}</Typography>
            <Typography className="song-artist">@username · 13M Plays</Typography>
          </Box>
        </Box>

        <Box className="music-player-controls">
          <IconButton className="control-button" onClick={onPrevious}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton className="play-button" onClick={onPlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton className="control-button" onClick={onNext}>
            <SkipNextIcon />
          </IconButton>
        </Box>

        <Box className="song-lyrics">
          <Box>
            <Typography className="lyrics-title">R&B with uplifting vibes about neon streets</Typography>
            <Typography className="lyrics-text ">
              {`(Verse 1)
              Runnin’ down neon streets,
              Heartbeat synced to the city beat,
              Lights flashin', can’t hold
              me down,
              I’m chasin' dreams through this wild town.`}
            </Typography>
          </Box>
        </Box>

        <Box className="more-options">
          <MoreHorizIcon className="more-options-icon" />
        </Box>

        <Box className="like-info">
          <Typography className="like-count">854K</Typography>
          <FavoriteBorderSharpIcon className="favorite-icon" />
        </Box>
      </Box>
    </Paper>
  );
};

export default MusicPlayer;
