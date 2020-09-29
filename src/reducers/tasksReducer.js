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
  const { type } = action;

  if (type===MAKE_IMPORTANT) {
    const myData = { ...state.tasks };
    const id = action.payload;
    if (myData[id].important === 0) myData[id].important = 1;
    else myData[id].important = 0;

    return {
      ...state,
      tasks: myData,
    };
  }
  if (type === ADD_TO_DONE) {
    const myData = { ...state.tasks };
    const id = action.payload;

    myData[id].done = 1;

    return {
      ...state,
      tasks: myData,
    };
  }
  if (type === ADD_TASK) {
    const { id } = action.payload;

    return {
      ...state,
      tasks: {
        ...state.tasks,
        [id]: {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          important: action.payload.important,
          done: 0,
        },
      },
    };
  }
  if (type === REMOVE_TASK) {
    const data = { ...state.tasks };
    const id = action.payload;
    delete data[id];
    return {
      ...state,
      tasks: data,
    };
  }
  if (type === DISPLAY_MODE)
    return {
      ...state,
      displayMode: action.payload,
    };

  return state;
}

export default tasksReducer;
