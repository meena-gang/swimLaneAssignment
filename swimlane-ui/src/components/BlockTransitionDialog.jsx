import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const BlockTransitionDialog = ({ open, onClose, onConfirm, block }) => {
  const [transitionData, setTransitionData] = useState('');

  const handleConfirm = () => {
    if (block) {
      onConfirm(transitionData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm Transition</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Task: {block?.title}</Typography>
        <TextField
          label="Transition Data"
          fullWidth
          variant="outlined"
          margin="normal"
          value={transitionData}
          onChange={(e) => setTransitionData(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleConfirm} color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockTransitionDialog;
