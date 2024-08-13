import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Swimlane from './components/Swimlane';
import BlockTransitionDialog from './components/BlockTransitionDialog';
import BlockDetails from './components/BlockDetails';
import Filter from './components/Filter';
import { moveBlock } from './store/slice';

const App = () => {
  const dispatch = useDispatch();
  const [lanes, setLanes] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [transitionFrom, setTransitionFrom] = useState(null);
  const [destination, setDestination] = useState(null);
  const filter = useSelector(state => state.swimlane.filter);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lanesResponse = await axios.get('http://localhost:5000/lanes');
        const blocksResponse = await axios.get('http://localhost:5000/blocks');
        setLanes(lanesResponse.data);
        setBlocks(blocksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredBlocks = Object.values(blocks).filter(block => {
    if (filter.attribute && filter.value) {
      return block[filter.attribute]?.toLowerCase().includes(filter.value.toLowerCase());
    }
    return true;
  });

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

  const handleConfirm = async (transitionData) => {
    if (currentBlock && destination) {
      const blockId = currentBlock.id;
      const fromLaneId = transitionFrom;
      const toLaneId = destination;
  
      if (!blockId) {
        console.error('Block ID is undefined');
        return;
      }
  
      const allowedTransitions = laneConfig[fromLaneId]?.allowedTransitions || [];
      if (allowedTransitions.includes(toLaneId)) {
        dispatch(moveBlock({ blockId, fromLaneId, toLaneId, transitionData }));
        
        try {
          await axios.patch(`http://localhost:5000/blocks/${blockId}`, {
            history: [...currentBlock.history, {
              from: fromLaneId,
              to: toLaneId,
              date: new Date().toISOString(),
              transitionData
            }]
          });
        } catch (error) {
          console.error('Error updating block:', error);
        }
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

  return (
    <>
      <Filter />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {lanes.map(lane => (
            <Swimlane
              key={lane.id}
              lane={lane}
              blocks={filteredBlocks.filter(block => lane.blocks.includes(block.id))}
              onBlockClick={handleBlockClick}
            />
          ))}
        </div>
        {currentBlock && (
          <BlockTransitionDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirm}
            block={blocks[currentBlock]} // Pass block data to the dialog
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
