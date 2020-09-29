import {
  ADD_TASK,
  DISPLAY_MODE,
  REMOVE_TASK,
  ADD_TO_DONE,
  MAKE_IMPORTANT,
} from "../actions/actions-types";

const initialStates = {
  tasks: {},
  displayMode: "all",
};

function tasksReducer(state = initialStates, action) {
  // if state is empty, we take initialStates

  if (action.type.localeCompare(MAKE_IMPORTANT) === 0) {
    const myData = { ...state.tasks };
    if (myData[action.payload].important === 0)
      myData[action.payload].important = 1;
    else myData[action.payload].important = 0;

    return {
      ...state,
      tasks: myData,
    };
  }
  if (action.type.localeCompare(ADD_TO_DONE) === 0) {
    const myData = { ...state.tasks };

    myData[action.payload].done = 1;

    return {
      ...state,
      tasks: myData,
    };
  }
  if (action.type.localeCompare(ADD_TASK) === 0) {
    return {
      ...state,
      tasks: {
        ...state.tasks,
        [action.payload.id]: {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          important: action.payload.important,
          done: 0,
        },
      },
    };
  }
  if (action.type.localeCompare(REMOVE_TASK) === 0) {
    const data = { ...state.tasks };
    delete data[action.payload];
    return {
      ...state,
      tasks: data,
    };
  }
  if (action.type.localeCompare(DISPLAY_MODE) === 0)
    return {
      ...state,
      displayMode: action.payload,
    };

  return state;
}

export default tasksReducer;
