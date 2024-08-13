import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import Swimlane from './components/Swimlane';
import BlockTransitionDialog from './components/BlockTransitionDialog';
import BlockDetails from './components/BlockDetails';
import { moveBlock } from './store/slice';
import { laneConfig } from './config/laneConfig';
import { MenuItem, Select, FormControl, InputLabel,Typography } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();
  const lanes = useSelector(state => state.swimlane.lanes);
  const blocks = useSelector(state => state.swimlane.blocks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [transitionFrom, setTransitionFrom] = useState(null);
  const [destination, setDestination] = useState(null);
  const [filter, setFilter] = useState('All');

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination: dest, draggableId } = result;
    setTransitionFrom(source.droppableId);
    setCurrentBlock(draggableId);
    setDestination(dest.droppableId);
    setDialogOpen(true);
  };

  const handleBlockClick = (blockId) => {
    setCurrentBlock(blocks[blockId]);
    setDetailsOpen(true);
  };

  const handleConfirm = (transitionData) => {
    if (currentBlock && destination) {
      const blockId = currentBlock;
      const fromLaneId = transitionFrom;
      const toLaneId = destination;

      if (!blockId) {
        console.error('Block ID is undefined');
        return;
      }

      const allowedTransitions = laneConfig[fromLaneId]?.allowedTransitions || [];
      if (allowedTransitions.includes(toLaneId)) {
        dispatch(moveBlock({ blockId, fromLaneId, toLaneId, transitionData }));
      } else {
        console.error('Transition not allowed');
      }
    }
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredLanes = filter === 'All' ? lanes : lanes.filter(lane => lane.id === filter);

  return (
    <>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
        Swimlane User Interface
      </Typography>
      <FormControl sx={{ minWidth: 120, mb: 2 }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label="Filter"
        >
          <MenuItem value="All">All</MenuItem>
          {Object.keys(laneConfig).map(laneId => (
            <MenuItem key={laneId} value={laneId}>{laneId}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {filteredLanes.map(lane => (
            <Swimlane key={lane.id} lane={lane} onBlockClick={handleBlockClick} />
          ))}
        </div>
        {currentBlock && (
          <BlockTransitionDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirm}
            block={blocks[currentBlock]}
          />
        )}
        {detailsOpen && (
          <BlockDetails
            open={detailsOpen}
            onClose={handleCloseDetails}
            block={currentBlock}
          />
        )}
      </DragDropContext>
    </>
  );
};

export default App;
