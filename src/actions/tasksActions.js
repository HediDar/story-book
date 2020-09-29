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

function addTaskAction(obj) {
  return {
    type: ADD_TASK,
    payload: { ...obj },
  };
}

function removeTaskAction(obj) {
  return {
    type: REMOVE_TASK,
    payload: obj.id,
  };
}

function makeImportantAction(obj) {
  return {
    type: MAKE_IMPORTANT,
    payload: obj.id,
  };
}

function addToDoneAction(obj) {
  return {
    type: ADD_TO_DONE,
    payload: obj.id,
  };
}

export {
  addToDoneAction,
  makeImportantAction,
  changeDisplayModeAction,
  addTaskAction,
  removeTaskAction,
};
