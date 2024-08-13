export const laneConfig = {
    'To Do': { // To Do
      allowedTransitions: ['In Progress'] // Can move to In Progress or Done
    },
    'In Progress': { // In Progress
      allowedTransitions: ['Testing/QA'] // Can move to Done
    },
    'Testing/QA': { // Done
      allowedTransitions: ['Done','In Progress'] // Can move to Done or again InProgress
    },
    'Done': { // Done
      allowedTransitions: ['To Do'] // Re-open Ticket
    }
  };
  