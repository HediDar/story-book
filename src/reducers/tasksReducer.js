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
};

function tasksReducer(state = initialStates, action) {
  // if state is empty, we take initialStates

  if (action.type.localeCompare(MAKE_IMPORTANT) === 0)
    return {
      ...state,
      tasks: state.tasks.map((el) => {
        if (el.id === action.payload && el.important === 1) el.important = 0;
        else if (el.id === action.payload && el.important === 0)
          el.important = 1;
        return el;
      }),
    };

  if (action.type.localeCompare(ADD_TO_DONE) === 0)
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
  if (action.type.localeCompare(ADD_TASK) === 0) {
    const data = [...state.tasks];
    data.push({
      id: action.payload.id,
      important: action.payload.important,
      name: action.payload.name,
      description: action.payload.description,
      done: 0,
    });

    // this doesnt work
    // tasks: ([...state.tasks]).push({
    //   id: action.payload.id,
    //   important: action.payload.important,
    //   name: action.payload.name,
    //   description: action.payload.description,
    //   done: 0,
    // }),

    return {
      ...state,
      tasks: data,
    };
  }
  if (action.type.localeCompare(REMOVE_TASK) === 0)
    return {
      ...state,
      tasks: state.tasks.filter((el) => el.id !== action.payload),
    };
  if (action.type.localeCompare(DISPLAY_MODE) === 0)
    return {
      ...state,
      displayMode: action.payload,
    };

  return state;
}

export default tasksReducer;
