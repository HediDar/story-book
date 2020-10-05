import {
  ADD_TASK,
  DISPLAY_MODE,
  REMOVE_TASK,
  ADD_TO_DONE,
  MAKE_IMPORTANT,
  FETCH_DATA_PENDING,
  FETCH_DATA_FULFILLED,
  FETCH_DATA_REJECTED,
  DELETE_DATA_PENDING,
  DELETE_DATA_FULFILLED,
  DELETE_DATA_REJECTED,
  UPDATE_IMPORTANT_PENDING,
  UPDATE_IMPORTANT_FULFILLED,
  UPDATE_IMPORTANT_REJECTED,
} from "../actions/actions-types";

const initialStates = {
  tasks: {},
  displayMode: "all",
};

function tasksReducer(state = initialStates, action) {
  // if state is empty, we take initialStates
  const { type } = action;
  // data fetching promise treatment
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
  // data delete promise treatment
  if (type === DELETE_DATA_PENDING) console.log("loading");
  if (type === DELETE_DATA_FULFILLED) {
    const data = { ...state.tasks };
    const id = action.payload.data.data;
    delete data[id];
    return {
      ...state,
      tasks: data,
    };
  }
  if (type === DELETE_DATA_REJECTED) console.log("delete error");

  if (type === REMOVE_TASK) {
    const data = { ...state.tasks };
    const { id } = action.payload;
    delete data[id];
    return {
      ...state,
      tasks: data,
    };
  }

  // data update promise
  if (type === UPDATE_IMPORTANT_PENDING) console.log("loading up");
  if (type === UPDATE_IMPORTANT_FULFILLED) {
    const myData = { ...state.tasks };
    const { _id } = action.payload.data.data;

    if (myData[_id].important === false) myData[_id].important = true;
    else myData[_id].important = false;

    return {
      ...state,
      tasks: myData,
    };
  }
  if (type === UPDATE_IMPORTANT_REJECTED) console.log("errror");
  // end promise treatment

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
