import {
  DISPLAY_MODE,
  FETCH_DATA_PENDING,
  FETCH_DATA_FULFILLED,
  FETCH_DATA_REJECTED,
  DELETE_DATA_PENDING,
  DELETE_DATA_FULFILLED,
  DELETE_DATA_REJECTED,
  UPDATE_TASK_PENDING,
  UPDATE_TASK_FULFILLED,
  UPDATE_TASK_REJECTED,
  ADD_TASK_FULFILLED,
  ADD_TASK_PENDING,
  ADD_TASK_REJECTED,
  LOADER_BOOL,
} from "../actions/actions-types";

const initialStates = {
  tasks: {},
  loaderBool: true,
  displayMode: "all",
};

function tasksReducer(state = initialStates, action) {
  // if state is empty, we take initialStates
  const { type } = action;

  // ///////////////////add promise
  if (type === ADD_TASK_PENDING)
    return {
      ...state,
      loaderBool: true,
    };
  if (type === ADD_TASK_FULFILLED) {
    const taskArg = action.payload.data.data;

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
      loaderBool: false,
    };
  }
  if (type === ADD_TASK_REJECTED) console.log("errror");

  // /////////////////////data delete promise treatment
  if (type === DELETE_DATA_PENDING)
    return {
      ...state,
      loaderBool: true,
    };
  if (type === DELETE_DATA_FULFILLED) {
    const data = { ...state.tasks };
    const id = action.payload.data.data;
    delete data[id];
    return {
      ...state,
      tasks: data,
      loaderBool: false,
    };
  }
  if (type === DELETE_DATA_REJECTED) console.log("delete error");

  // //////////////////data fetching promise treatment
  if (type === FETCH_DATA_PENDING)
    return {
      ...state,
      loaderBool: true,
    };
  if (type === FETCH_DATA_FULFILLED) {
    const resultToSend = {};
    for (let i = 0; i < action.payload.data.length; i++) {
      resultToSend[action.payload.data[i]._id] = action.payload.data[i];
    }

    return {
      ...state,
      tasks: resultToSend,
      loaderBool: false,
    };
  }
  if (type === FETCH_DATA_REJECTED) console.log("errror");

  // /////////////////////data update promise
  if (type === UPDATE_TASK_PENDING)
    return {
      ...state,
      loaderBool: true,
    };
  if (type === UPDATE_TASK_FULFILLED) {
    const myData = { ...state.tasks };
    const { _id } = action.payload.data.data;

    if (action.meta === true) {
      if (myData[_id].important === false) myData[_id].important = true;
      else myData[_id].important = false;

      return {
        ...state,
        tasks: myData,
        loaderBool: false,
      };
    }

    if (myData[_id].done === false) myData[_id].done = true;
    else myData[_id].done = false;

    return {
      ...state,
      tasks: myData,
      loaderBool: false,
    };
  }
  if (type === UPDATE_TASK_REJECTED) console.log("errror");

  // end promise treatment

  if (type === DISPLAY_MODE)
    return {
      ...state,
      displayMode: action.payload,
    };

  if (type === LOADER_BOOL)
    return {
      ...state,
      loaderBool: true,
    };

  return state;
}

export default tasksReducer;
