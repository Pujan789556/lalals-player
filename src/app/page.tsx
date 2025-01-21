'use client';

import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Paper, Grid } from '@mui/material';
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
  const [currentSong, setCurrentSong] = useState<Music | null>(null);
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
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* Song List Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Music List
            </Typography>
            <List>
              {musicList.map((song) => (
                <ListItem
                  key={song.id}
                  onClick={() => {
                    setCurrentSong(song);
                    setIsPlaying(false);
                    setProgress(0);
                  }}
                >
                  <ListItemText primary={song.name} secondary={`${song.duration} seconds`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Music Player Section */}
        <Grid item xs={12} md={8}>
          {currentSong && (
            <MusicPlayer
              currentSong={currentSong}
              isPlaying={isPlaying}
              progress={progress}
              isHovered={isHovered}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSeek={handleSeek}
              onClose={handleClose}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MusicPage;
