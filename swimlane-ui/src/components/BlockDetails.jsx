import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem } from '@mui/material';

const BlockDetails = ({ open, onClose, block }) => {
  // if (!block) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{block?.title}</Typography>
        <Typography variant="body1">{block?.description}</Typography>
        <Typography variant="subtitle1" mt={2}>Transition History:</Typography>
        <List>
          {block?.history.map((entry, index) => (
            <ListItem key={index}>
              <Typography variant="body2">
                From: {entry.from} to: {entry.to} Date: {entry.date}
                {entry.transitionData &&  `, Comment: ${entry.transitionData}`}
              </Typography>
            </ListItem>
          ))}
          {block?.history.length === 0 && (
            <ListItem>
              <Typography variant="body2">No transitions yet</Typography>
            </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockDetails;
