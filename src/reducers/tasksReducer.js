const initialStates = {
  tasks: [],
  tasksToShow: [],
  inAll: 1,
  inCompleted: 0,
  inActive: 0,
  increment: 0,
  testActive: 0,
  testCompleted: 0,
};

function tasksReducer(state = initialStates, action) {
  // if state is empty, we take initialStates
  switch (action.type) {
    // the case is the type
    case "updateTasks":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "updateTestActive":
        return {
          ...state,
          testActive: action.payload,
        };
     

    case "updateTestCompleted":
     
        return {
          ...state,
          testCompleted: action.payload,
        };
      

    case "setIncrementAction":
      return {
        ...state,
        increment: action.payload,
      };

    case "updateIncrement":
      return {
        ...state,
        increment: state.increment + 1,
      };

    case "updateTasksFromData":
      return {
        ...state,
        tasks: action.payload,
      };

    case "updateTasksToShow":
      return {
        ...state,
        tasksToShow: [...state.tasksToShow, action.payload],
      };

    case "updateTasksToShowWithoutTasks":
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

    case "changeToShowToTasks":
      return {
        ...state,
        tasksToShow: state.tasks,
      };
    default:
      return state;
  }
}

export default tasksReducer;
