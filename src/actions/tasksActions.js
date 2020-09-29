import {
  DISPLAY_MODE,
  REMOVE_TASK,
  ADD_TASK,
  ADD_TO_DONE,
  MAKE_IMPORTANT,
} from "./actions-types";

function changeDisplayModeAction(mode) {
  return {
    type: DISPLAY_MODE,
    payload: mode,
  };
}

function addTaskAction(task) {
  return {
    type: ADD_TASK,
    payload: { ...task },
  };
}

function removeTaskAction({id}) {
  return {
    type: REMOVE_TASK,
    payload: {id},
  };
}

function makeImportantAction({id}) {
  return {
    type: MAKE_IMPORTANT,
    payload: {id},
  };
}

function addToDoneAction({id}) {
  return {
    type: ADD_TO_DONE,
    payload: {id},
  };
}

export {
  addToDoneAction,
  makeImportantAction,
  changeDisplayModeAction,
  addTaskAction,
  removeTaskAction,
};
