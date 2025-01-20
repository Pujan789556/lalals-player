'use client';

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Box, IconButton, Slider, Paper } from '@mui/material';
import MusicPlayer from './component/player';

type Music = {
  id: number;
  name: string;
  lyrics: string;
  duration: number;
};

const musicList: Music[] = [
  {
    id: 1,
    name: 'Song One',
    lyrics: 'These are the lyrics of Song One.',
    duration: 210,
  },
  {
    id: 2,
    name: 'Song Two',
    lyrics: 'Lyrics of Song Two go here.',
    duration: 180,
  },
  {
    id: 3,
    name: 'Song Three',
    lyrics: 'Song Three has these lyrics.',
    duration: 240,
  },
];

const MusicPage = () => {
  const [currentSong, setCurrentSong] = useState<Music | null>(musicList[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = musicList.findIndex((song) => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % musicList.length;
    setCurrentSong(musicList[nextIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const currentIndex = musicList.findIndex((song) => song.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + musicList.length) % musicList.length;
    setCurrentSong(musicList[prevIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleSeek = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      setProgress(value);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClose = () => {
    setCurrentSong(null);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <Box>
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        isHovered={isHovered}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        onClose={handleClose}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </Box>
  );
};

export default MusicPage;
