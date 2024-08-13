import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Paper, Typography, Box } from '@mui/material';

const Swimlane = ({ lane, onBlockClick }) => {
  return (
    <Droppable droppableId={lane.id}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{ 
            p: 2, 
            width: 300, 
            minHeight: 500, 
            backgroundColor: '#f0f0f0', 
            m: 1 
          }}
        >
          <Typography variant="h6" gutterBottom>{lane.title}</Typography>
          {lane.blocks.map((blockId, index) => (
            <Draggable key={blockId} draggableId={blockId} index={index}>
              {(provided) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{ 
                    p: 2, 
                    mb: 1, 
                    backgroundColor: '#fff', 
                    border: '1px solid #ddd', 
                    borderRadius: 1,
                    cursor: 'pointer',
                    boxShadow: 1
                  }}
                  onClick={() => onBlockClick(blockId)}
                >
                  {blockId}
                </Paper>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default Swimlane;

