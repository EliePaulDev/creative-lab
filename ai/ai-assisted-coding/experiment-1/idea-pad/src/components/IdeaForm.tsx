
import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

interface IdeaFormProps {
  onAddIdea: (text: string) => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onAddIdea }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddIdea(text);
      setText('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 2 }}>
      <TextField
        label="New Idea"
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Add Idea
      </Button>
    </Box>
  );
};

export default IdeaForm;
