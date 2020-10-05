import {
  ADD_TASK,
  DISPLAY_MODE,
  REMOVE_TASK,
  ADD_TO_DONE,
  MAKE_IMPORTANT,
  FETCH_DATA_PENDING,
  FETCH_DATA_FULFILLED,
  FETCH_DATA_REJECTED,
} from "../actions/actions-types";

const initialStates = {
  tasks: {},
  displayMode: "all",
};

function tasksReducer(state = initialStates, action) {
  // if state is empty, we take initialStates
  const { type } = action;

  if (type === FETCH_DATA_PENDING) console.log("loading");
  if (type === FETCH_DATA_FULFILLED) {
    const resultToSend = {};
    for (let i = 0; i < action.payload.data.length; i++) {
      resultToSend[action.payload.data[i]._id] = action.payload.data[i];
    }

    return {
      ...state,
      tasks: resultToSend,
    };
  }
  if (type === FETCH_DATA_REJECTED) console.log("errror");

  if (type === REMOVE_TASK) {
    const data = { ...state.tasks };
    const { id } = action.payload;
    delete data[id];
    return {
      ...state,
      tasks: data,
    };
  }

  if (type === MAKE_IMPORTANT) {
    const myData = { ...state.tasks };
    const { id } = action.payload;
    if (myData[id].important === false) myData[id].important = true;
    else myData[id].important = false;

    return {
      ...state,
      tasks: myData,
    };
  }
  if (type === ADD_TO_DONE) {
    const myData = { ...state.tasks };
    const { id } = action.payload;
    myData[id].done = true;

    return {
      ...state,
      tasks: myData,
    };
  }
  if (type === ADD_TASK) {
    const taskArg = action.payload;

    return {
      ...state,
      tasks: {
        ...state.tasks,
        [taskArg._id]: {
          _id: taskArg._id,
          name: taskArg.name,
          description: taskArg.description,
          important: taskArg.important,
          done: false,
        },
      },
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
