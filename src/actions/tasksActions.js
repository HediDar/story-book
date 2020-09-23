function updateTasksAction(tasksData) {
  return {
    type: "updateTasks",
    payload: tasksData,
  };
}

function updateTasksToShowAction(tasksData) {
  return {
    type: "updateTasksToShow",
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

export {
  updateTasksAction,
  updateTasksToShowAction,
  updateInAllAction,
  updateInActiveAction,
  updateInCompletedAction,
};
