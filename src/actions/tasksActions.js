import {
  SET_LENGTH,
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

function addTaskAction(id, name, description, important) {
  return {
    type: ADD_TASK,
    payload: {
      "id": id,
      "name": name,
      "description": description,
      "important": important,
    },
  };
}

function removeTaskAction(idTaskToRemove) {
  return {
    type: REMOVE_TASK,
    payload: idTaskToRemove,
  };
}

function setLengthAction(data) {
  return {
    type: SET_LENGTH,
    payload: data,
  };
}

function makeImportantAction(id) {
  return {
    type: MAKE_IMPORTANT,
    payload: id,
  };
}

function addToDoneAction(id) {
  return {
    type: ADD_TO_DONE,
    payload: id,
  };
}

export {
  addToDoneAction,
  makeImportantAction,
  setLengthAction,
  changeDisplayModeAction,
  addTaskAction,
  removeTaskAction,
};
