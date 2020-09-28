import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleTask from "./SingleTask";
import * as actionCreators from "../actions/tasksActions";

class ToDosAndDones extends Component {
  componentDidMount() {}

  componentDidUpdate() {
    const { onActive2, onCompleted2, testActive, testCompleted } = this.props;

    if (testActive === 1) onActive2();
    else if (testCompleted === 1) onCompleted2();
  }

  onImportantHandle = (id) => {
    const {
      updateTasksFromDataMapAction,
      tasks,
      displayMode,
      updateTasksToShowWithoutTasksAction,
      onCompleted2,
      onActive2,
    } = this.props;

    updateTasksFromDataMapAction(id);
    localStorage.setItem("tasksInLocalStorage", JSON.stringify(tasks));

    if (displayMode.localeCompare("all") === 0) {
      updateTasksToShowWithoutTasksAction(tasks);
    } else if (displayMode.localeCompare("actif") === 0) {
      onActive2();
    } else if (displayMode.localeCompare("done") === 0) {
      onCompleted2();
    }
  };

  onDoneHandle = (id) => {
    const {
      displayMode,
      updateTestCompletedAction,
      updateTestActiveAction,
      updateTasksToShowWithoutTasksAction,
      tasks,
      updateTasksFromDataRemoveMapAction,
    } = this.props;

    const data = tasks.map((el) => {
      if (el.id === id) {
        el.done = 1;
        return el;
      }
      return el;
    });

    updateTasksFromDataRemoveMapAction(id);

    localStorage.setItem("tasksInLocalStorage", JSON.stringify(tasks));

    if (displayMode.localeCompare("all") === 0)
      updateTasksToShowWithoutTasksAction(data);
    else if (displayMode.localeCompare("actif") === 0)
      updateTestActiveAction(1);
    else if (displayMode.localeCompare("done") === 0)
      updateTestCompletedAction(1);
  };

  onDeleteHandle = (id) => {
    const {
      displayMode,
      updateTestCompletedAction,
      updateTestActiveAction,
      updateTasksToShowWithoutTasksAction,
      updateTasksFromDataAction,
      tasks,
    } = this.props;

    const data = tasks.filter((el) => el.id !== id);

    updateTasksFromDataAction(data);

    if (displayMode.localeCompare("all") === 0)
      updateTasksToShowWithoutTasksAction(data);
    else if (displayMode.localeCompare("actif") === 0)
      updateTestActiveAction(1);
    else if (displayMode.localeCompare("done") === 0)
      updateTestCompletedAction(1);
    localStorage.setItem("tasksInLocalStorage", JSON.stringify(data));
  };

  render() {
    const { tasks, displayMode, setLengthAction } = this.props;
    const loopData = [...tasks];

    const tasksFiltredToDo = [];
    let tasksFiltredToDo2 = [];

    loopData.forEach((el) => {
      if (el.done === 0 && el.important === 1) tasksFiltredToDo.push(el);
    });

    loopData.forEach((el) => {
      if (el.done === 0 && el.important === 0) tasksFiltredToDo.push(el);
    });

    loopData.forEach((el) => {
      if (el.done === 1) tasksFiltredToDo.push(el);
    });

    if (displayMode.localeCompare("all") === 0)
      tasksFiltredToDo2 = [...tasksFiltredToDo];
    else if (displayMode.localeCompare("actif") === 0) {
      tasksFiltredToDo.forEach((el) => {
        if (el.done === 0) tasksFiltredToDo2.push(el);
      });
    } else if (displayMode.localeCompare("done") === 0) {
      tasksFiltredToDo.forEach((el) => {
        if (el.done === 1) tasksFiltredToDo2.push(el);
      });
    }

    setLengthAction(tasksFiltredToDo2);
    return (
      <>
        {tasksFiltredToDo2.map((task) => (
          <SingleTask
            key={task.id}
            task={task}
            displayMode={displayMode}
            onDone={this.onDoneHandle}
            onDeleteTask={this.onDeleteHandle}
            onImportant={this.onImportantHandle}
          />
        ))}
      </>
    );
  }
}

ToDosAndDones.propTypes = {
  updateTestCompletedAction: PropTypes.func,
  updateTestActiveAction: PropTypes.func,
  updateTasksFromDataRemoveMapAction: PropTypes.func,
  updateTasksFromDataAction: PropTypes.func,
  updateTasksToShowWithoutTasksAction: PropTypes.func,
  setIncrementAction: PropTypes.func,
  onActive2: PropTypes.number,
  onCompleted2: PropTypes.number,
  testActive: PropTypes.number,
  testCompleted: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),

  updateTasksFromDataMapAction: PropTypes.func,
};

ToDosAndDones.defaultProps = {
  updateTasksFromDataAction: () => {},
  updateTasksToShowWithoutTasksAction: () => {},
  setIncrementAction: () => {},
  updateTestCompletedAction: () => {},
  updateTestActiveAction: () => {},
  updateTasksFromDataRemoveMapAction: () => {},
  onActive2: 0,
  onCompleted2: 0,
  testActive: 0,
  testCompleted: 0,
  tasks: [{}],
  updateTasksFromDataMapAction: () => {},
};

const mapStateToProps = (state) => {
  return {
    tasksToShow: state.tasksToShow,
    displayMode: state.displayMode,
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLengthAction: (payload) =>
    dispatch(actionCreators.setLengthAction(payload)),
  updateTasksFromDataRemoveMapAction: (payload) =>
    dispatch(actionCreators.updateTasksFromDataRemoveMapAction(payload)),
  updateTasksFromDataMapAction: (payload) =>
    dispatch(actionCreators.updateTasksFromDataMapAction(payload)),
  updateTestActiveAction: (payload) =>
    dispatch(actionCreators.updateTestActiveAction(payload)),
  updateTestCompletedAction: (payload) =>
    dispatch(actionCreators.updateTestCompletedAction(payload)),
  setIncrementAction: (payload) =>
    dispatch(actionCreators.setIncrementAction(payload)),
  updateIncrementAction: () => dispatch(actionCreators.updateIncrementAction()),
  updateTasksFromDataAction: (payload) =>
    dispatch(actionCreators.updateTasksFromDataAction(payload)),
  updateTasksToShowWithoutTasksAction: (payload) =>
    dispatch(actionCreators.updateTasksToShowWithoutTasksAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDosAndDones);
