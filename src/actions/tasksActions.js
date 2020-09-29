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

function removeTaskAction(idToRemoveObj) {
  return {
    type: REMOVE_TASK,
    payload: idToRemoveObj.id,
  };
}

function makeImportantAction(idToMakeImportantObj) {
  return {
    type: MAKE_IMPORTANT,
    payload: idToMakeImportantObj.id,
  };
}

function addToDoneAction(idToAddToDoneObj) {
  return {
    type: ADD_TO_DONE,
    payload: idToAddToDoneObj.id,
  };
}

export {
  addToDoneAction,
  makeImportantAction,
  changeDisplayModeAction,
  addTaskAction,
  removeTaskAction,
};
