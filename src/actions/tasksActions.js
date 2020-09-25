import { UPDATE_TASKS,DISPLAY_MODE, REMOVE_TASK, ADD_TASK } from "./actions-types";

function updateTasksAction(tasksData) {
  return {
    type: UPDATE_TASKS,
    payload: tasksData,
  };
}

function setToSHowToTasksAction() {
  return {
    type: "changeToShowToTasks",
  };
}

function updateTasksToShowAction(tasksData) {
  return {
    type: "updateTasksToShow",
    payload: tasksData,
  };
}

function updateTasksToShowWithoutTasksAction(tasksData) {
  return {
    type: "updateTasksToShowWithoutTasks",
    payload: tasksData,
  };
}

function updateInAllAction(inAllValue) {
  return {
    type: "updateInAll",
    payload: inAllValue,
  };
}

function updateInActiveAction(inActiveValue) {
  return {
    type: "updateInActive",
    payload: inActiveValue,
  };
}

function updateInCompletedAction(inCompletedValue) {
  return {
    type: "updateInCompleted",
    payload: inCompletedValue,
  };
}

function updateTasksFromDataAction(tasksData) {
  return {
    type: "updateTasksFromData",
    payload: tasksData,
  };
}


function updateTasksFromDataMapAction(id) {
  return {
    type: "updateTasksFromDataMap",
    payload: id,
  };
}

function updateTasksFromDataRemoveMapAction(id) {
  return {
    type: "updateTasksFromDataRemoveMap",
    payload: id,
  };
}


function updateIncrementAction() {
  return {
    type: "updateIncrement",
  };
}

function setIncrementAction(number) {
  return {
    type: "setIncrementAction",
    payload: number,
  };
}

function updateTestActiveAction(number) {
  return {
    type: "updateTestActive",
    payload: number,
  };
}

function updateTestCompletedAction(number) {
  return {
    type: "updateTestCompleted",
    payload: number,
  };
}


//   my new actions//////////////

function changeDisplayModeAction(mode) {
  return {
    type: DISPLAY_MODE,
    payload: mode,
  };
}

function addTaskAction(id,name,description,important) {
  return {
    type: ADD_TASK,
    payload: {"id":id,"name":name,"description":description,"important":important},
  };
}


function removeTaskAction(idTaskToRemove) {
  return {
    type: REMOVE_TASK,
    payload: idTaskToRemove,
  };
}


export {
  changeDisplayModeAction,
  addTaskAction,
  removeTaskAction,




  updateTasksFromDataRemoveMapAction,
  updateTasksFromDataMapAction,
  updateTestActiveAction,
  updateTestCompletedAction,
  setIncrementAction,
  updateIncrementAction,
  updateTasksAction,
  updateTasksToShowAction,
  updateInAllAction,
  updateInActiveAction,
  updateInCompletedAction,
  setToSHowToTasksAction,
  updateTasksToShowWithoutTasksAction,
  updateTasksFromDataAction,
};
