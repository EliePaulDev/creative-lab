
import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Idea {
  id: number;
  text: string;
}

interface IdeaListProps {
  ideas: Idea[];
  onDeleteIdea: (id: number) => void;
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas, onDeleteIdea }) => {
  return (
    <List>
      {ideas.map((idea) => (
        <ListItem
          key={idea.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteIdea(idea.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={idea.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default IdeaList;
