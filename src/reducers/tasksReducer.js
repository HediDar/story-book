import {
  ADD_TASK,
  DISPLAY_MODE,
  REMOVE_TASK,
  UPDATE_TASKS,
  SET_LENGTH,
  ADD_TO_DONE,
  MAKE_IMPORTANT,
} from "../actions/actions-types";

const initialStates = {
  tasks: [],
  displayMode: "all",
  length: 0,
  tasksToShow: [],
  increment: 0,
  testActive: 0,
  testCompleted: 0,
};

function tasksReducer(state = initialStates, action) {
  // if state is empty, we take initialStates
  const data = [...state.tasks];
  switch (action.type) {
    // the case is the type

    case MAKE_IMPORTANT:
      return {
        ...state,
        tasks: state.tasks.map((el) => {
          if (el.id === action.payload) {
            if (el.important === 1) {
              el.important = 0;
              return el;
            }
            el.important = 1;
            return el;
          }
          return el;
        }),
      };

    case ADD_TO_DONE:
      return {
        ...state,
        tasks: state.tasks.map((el) => {
          if (el.id === action.payload) {
            el.done = 1;
            return el;
          }
          return el;
        }),
      };

    case SET_LENGTH:
      return {
        ...state,
        length: action.payload.length,
      };

    case ADD_TASK:
      data.push({
        id: action.payload.id,
        important: action.payload.important,
        name: action.payload.name,
        description: action.payload.description,
        done: 0,
      });
      return {
        ...state,
        tasks: data,
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((el) => el.id !== action.payload),
      };

    case DISPLAY_MODE:
      return {
        ...state,
        displayMode: action.payload,
      };

    // old actions
    case UPDATE_TASKS:
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

    case "updateTasksFromDataRemoveMap":
      return {
        ...state,
        tasks: state.tasks.map((el) => {
          if (el.id === action.payload) {
            el.done = 1;
            return el;
          }
          return el;
        }),
      };

    case "updateTasksFromDataMap":
      return {
        ...state,
        tasks: state.tasks.map((el) => {
          if (el.id === action.payload) {
            if (el.important === 1) {
              el.important = 0;
              return el;
            }
            el.important = 1;
            return el;
          }
          return el;
        }),
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
