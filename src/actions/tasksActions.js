function updateTasksAction(tasksData) {
  return {
    type: "updateTasks",
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

export {
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
