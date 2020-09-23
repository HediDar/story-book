const initialStates = {
  tasks: [],
  tasksToShow: [],
  inAll: 1,
  inCompleted: 0,
  inActive: 0,
};

function tasksReducer(state = initialStates, action) {
  const data = state;
  // if state is empty, we take initialStates
  switch (action.type) {
    // the case is the type
    case "updateTasks":
      return {
        ...state,
        tasks: action.payload,
      };

    case "updateTasksToShow":
      return {
        ...state,
        tasksToShow: action.payload,
      };

    case "updateInAll":
      return {
        ...state,
        inAll: action.payload,
      };

    case "updateInActive":
      return {
        ...state,
        inActive: action.payload,
      };

    case "updateInCompleted":
      return {
        ...state,
        inCompleted: action.payload,
      };

    default:
      return state;
  }
}

export default tasksReducer;
