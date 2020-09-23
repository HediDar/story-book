
export function updateTasks(tasksData) {
  return {
    type: "updateTasks",
    payload: tasksData,
  };
}

export default updateTasks;
