const initialStates = {
  tasks: [],
  tasksToShow: [],
  inAll: 1,
  inCompleted: 0,
  inActive: 0,
};

function tasksReducer(state = initialStates, action) {
  // if state is empty, we take initialStates
  switch (action.type) {
    case "updateTasks":
      return {
        ...state,
        [state.tasks]: action.payload,
      };

    case "updateTasksToShow":
      return {
        ...state,
        [state.tasksToShow]: action.payload,
      };

    case "updateInAllAction":
      return {
        ...state,
        [state.inAll]: action.payload,
      };

    case "updateInActiveAction":
      return {
        ...state,
        [state.inActive]: action.payload,
      };

    case "updateInCompletedAction":
      return {
        ...state,
        [state.inCompleted]: action.payload,
      };

    default:
      return state;
  }
}

export default tasksReducer;
