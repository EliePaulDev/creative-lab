'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box } from '@mui/material';
import IdeaForm from '../components/IdeaForm';
import IdeaList from '../components/IdeaList';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { ThemeContext } from '../context/ThemeContext';

interface Idea {
  id: number;
  text: string;
}

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const storedIdeas = localStorage.getItem('ideas');
    if (storedIdeas) {
      setIdeas(JSON.parse(storedIdeas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas]);

  const addIdea = (text: string) => {
    const newIdea = {
      id: Date.now(),
      text,
    };
    setIdeas([...ideas, newIdea]);
  };

  const deleteIdea = (id: number) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1">
          Creative Idea Pad
        </Typography>
        <ThemeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </Box>
      <IdeaForm onAddIdea={addIdea} />
      <IdeaList ideas={ideas} onDeleteIdea={deleteIdea} />
    </Container>
  );
}