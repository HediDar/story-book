import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleTask from "./SingleTask";
import * as actionCreators from "../actions/tasksActions";

class ToDosAndDones extends Component {
  componentDidMount() {}

  onImportantHandle = (id) => {
    const { makeImportantAction } = this.props;
    makeImportantAction(id);
  };

  onDoneHandle = (id) => {
    const { addToDoneAction } = this.props;
    addToDoneAction(id);
  };

  onDeleteHandle = (id) => {
    const { removeTaskAction } = this.props;
    removeTaskAction(id);
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
  makeImportantAction: PropTypes.func,
  addToDoneAction: PropTypes.func,
  removeTaskAction: PropTypes.func,
  setLengthAction: PropTypes.func,
  displayMode: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

ToDosAndDones.defaultProps = {
  makeImportantAction: () => {},
  removeTaskAction: () => {},
  addToDoneAction: () => {},
  setLengthAction: () => {},
  displayMode: "all",
  tasks: [{}],
};

const mapStateToProps = (state) => {
  return {
    displayMode: state.displayMode,
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeTaskAction: (payload) =>
    dispatch(actionCreators.removeTaskAction(payload)),
  addToDoneAction: (payload) =>
    dispatch(actionCreators.addToDoneAction(payload)),
  makeImportantAction: (payload) =>
    dispatch(actionCreators.makeImportantAction(payload)),
  setLengthAction: (payload) =>
    dispatch(actionCreators.setLengthAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDosAndDones);
