function tasksReducer(state, action) {
  switch (action.type) {
    case "updateTasks":
      return {
        tasks: action.payload, // tasks is this.state.tasks
      };

    case "updateTasksToShow":
      return {
        tasksToShow: action.payload, // tasks is this.state.tasks
      };

    case "updateInAllAction":
      return {
        inAll: action.payload, // tasks is this.state.tasks
      };

    case "updateInActiveAction":
      return {
        inActive: action.payload, // tasks is this.state.tasks
      };

    case "updateInCompletedAction":
      return {
        inCompleted: action.payload, // tasks is this.state.tasks
      };

    default:
      return state;
  }
}

export default tasksReducer;
