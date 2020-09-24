import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleTask from "./SingleTask";
import * as actionCreators from "../actions/tasksActions";

class ToDosAndDones extends Component {
  componentDidMount() {
    console.log("did mount");
    console.log(localStorage.getItem("incrementInLocalStorage"));

    if (localStorage.getItem("tasksInLocalStorage")) {
      const { updateTasksFromDataAction } = this.props;
      const { updateTasksToShowWithoutTasksAction } = this.props;
      const { setIncrementAction } = this.props;

      const data = JSON.parse(localStorage.getItem("tasksInLocalStorage"));
      if (data) {
        updateTasksFromDataAction(data);
        updateTasksToShowWithoutTasksAction(data);
      }
      if (localStorage.getItem("incrementInLocalStorage")) {
        setIncrementAction(
          parseInt(localStorage.getItem("incrementInLocalStorage")) + 1
        );
      }
    }
  }

  onImportantHandle = (id) => {
    const { tasks } = this.props;
    const { inAll } = this.props;
    const { inActive } = this.props;
    const { inCompleted } = this.props;
    const { updateTasksToShowWithoutTasksAction } = this.props;
    const { updateTasksFromDataAction } = this.props;
    const { onAll2 } = this.props;
    const { onActive2 } = this.props;

    const actualTasks = tasks;
    actualTasks.forEach((el, index) => {
      if (el.id === id) {
        if (el.important === 1) actualTasks[index].important = 0;
        else if (el.important === 0) actualTasks[index].important = 1;
      }
    });

    updateTasksFromDataAction(actualTasks);

    if (inAll === 1) updateTasksToShowWithoutTasksAction(actualTasks);
    else if (inActive === 1) onAll2();
    else if (inCompleted === 1) onActive2();
  };

  onDoneHandle = (id) => {
    console.log("handle add id= " + id);
  };

  onDeleteHandle = (id) => {
    console.log("handle delete id= " + id);
  };

  render() {
    const { tasksToShow } = this.props;
    const { onDoneTaskApp } = this.props;
    const { onDeleteTaskApp } = this.props;
    const { onMakeImportant } = this.props;

    // const tasksFiltredToDo = [];

    // myTasks.forEach((el) => {
    //   if (el.done === 0 && el.important === 1) tasksFiltredToDo.push(el);
    // });

    // myTasks.forEach((el) => {
    //   if (el.done === 0 && el.important === 0) tasksFiltredToDo.push(el);
    // });

    // myTasks.forEach((el) => {
    //   if (el.done === 1) tasksFiltredToDo.push(el);
    // });

    return (
      <>
        {tasksToShow.map((task) => (
          <SingleTask
            key={task.id}
            task={task}
            onDone={this.onDoneHandle}
            onDeleteTask={this.onDeleteHandle}
            onImportant={this.onImportantHandle}
          />
        ))}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setIncrementAction: (payload) =>
    dispatch(actionCreators.setIncrementAction(payload)),
  updateIncrementAction: () => dispatch(actionCreators.updateIncrementAction()),
  updateTasksFromDataAction: (payload) =>
    dispatch(actionCreators.updateTasksFromDataAction(payload)),
  updateTasksToShowWithoutTasksAction: (payload) =>
    dispatch(actionCreators.updateTasksToShowWithoutTasksAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDosAndDones);
