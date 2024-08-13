import { createSlice } from '@reduxjs/toolkit';
import { laneConfig } from '../config/laneConfig';

const initialState = {
    lanes: [
      { id: 'To Do', title: 'To Do', blocks: ['Bug-1', 'Bug-2'] },
      { id: 'In Progress', title: 'In Progress', blocks: [] },
      { id: 'Testing/QA', title: 'Testing/QA', blocks: [] },
      { id: '4', title: 'Done', blocks: [] }
    ],
    blocks: {
      'Bug-1': { id: 'Bug-1', title: 'Bug 1', description: 'Details of Bug 1 : Landing Page is not working correctly.', history: [] },
      'Bug-2': { id: 'Bug-2', title: 'Bug 2', description: 'Details of Bug 2 : Cross Filter is not working as expected. ', history: [] }
    }
  };

const swimlaneSlice = createSlice({
  name: 'swimlane',
  initialState,
  reducers: {
    moveBlock(state, action) {
      const { blockId, fromLaneId, toLaneId, transitionData } = action.payload;

      const fromLane = state.lanes.find(lane => lane.id === fromLaneId);
      const toLane = state.lanes.find(lane => lane.id === toLaneId);
      const block = state.blocks[blockId];

      if (!block) {
        console.error('Block not found:', blockId);
        return;
      }
      if (!fromLane || !toLane) {
        console.error('Source or destination lane not found:', { fromLaneId, toLaneId });
        return;
      }

      if (!laneConfig[fromLaneId]?.allowedTransitions.includes(toLaneId)) {
        console.error('Transition not allowed:', { fromLaneId, toLaneId });
        return;
      }

      fromLane.blocks = fromLane.blocks.filter(id => id !== blockId);
      toLane.blocks.push(blockId);
      block.history = block.history || [];
      block.history.push({
        from: fromLaneId,
        to: toLaneId,
        date: new Date().toISOString(),
        transitionData
      });
    }
  }
});

export const { moveBlock } = swimlaneSlice.actions;
export default swimlaneSlice.reducer;
