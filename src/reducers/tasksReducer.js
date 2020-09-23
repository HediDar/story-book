export default (state, action) => {
  switch (action.type) {
    case "updateTasks":
      return {
        tasks: action.payload, // tasks is this.state.tasks
      };
    default:
      return state;
  }
};
