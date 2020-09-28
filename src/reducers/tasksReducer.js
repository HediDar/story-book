import {
  ADD_TASK,
  DISPLAY_MODE,
  REMOVE_TASK,
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

    default:
      return state;
  }
}

export default tasksReducer;
