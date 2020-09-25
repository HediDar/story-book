import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleTask from "./SingleTask";
import * as actionCreators from "../actions/tasksActions";

class ToDosAndDones extends Component {
  componentDidMount() {
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
    const { onCompleted2 } = this.props;
    const { onActive2 } = this.props;

    const actualTasks = tasks.map((el) => {
      if (el.id === id) {
        if (el.important === 1) {
          el.important = 0;
          return el;
        }
        el.important = 1;
        return el;
      }
      return el;
    });

    updateTasksFromDataAction(actualTasks);
    localStorage.setItem("tasksInLocalStorage", JSON.stringify(tasks));


    if (inAll === 1) {
      updateTasksToShowWithoutTasksAction(actualTasks);
      console.log(this.props.tasksToShow);
    } else if (inActive === 1) {
      onActive2();
    } else if (inCompleted === 1) {
      onCompleted2();
    }
  };

  onDoneHandle = (id) => {
    const { tasks } = this.props;
    const { inAll } = this.props;
    const { inCompleted } = this.props;
    const { inActive } = this.props;
    const { onAll2 } = this.props;
    const { onActive2 } = this.props;

    const data = tasks.map((el) => {
      if (el.id === id) {
        el.done = 1;
        return el;
      }
      return el;
    });

    this.props.updateTasksFromDataAction(data);
    localStorage.setItem("tasksInLocalStorage", JSON.stringify(this.props.tasks));


    if (inAll === 1) this.props.updateTasksToShowWithoutTasksAction(data);
    else if (inActive === 1) onActive2();
    else if (inCompleted === 1) onAll2();

    
  };

  onDeleteHandle = (id) => {
    console.log("handle delete id= " + id);





    localStorage.setItem("tasksInLocalStorage", JSON.stringify(this.props.tasks));

  };

  render() {
    const { tasksToShow } = this.props;
    const { onDoneTaskApp } = this.props;
    const { onDeleteTaskApp } = this.props;
    const { onMakeImportant } = this.props;

    const myTasks = tasksToShow;

    const tasksFiltredToDo = [];

    myTasks.forEach((el) => {
      if (el.done === 0 && el.important === 1) tasksFiltredToDo.push(el);
    });

    myTasks.forEach((el) => {
      if (el.done === 0 && el.important === 0) tasksFiltredToDo.push(el);
    });

    myTasks.forEach((el) => {
      if (el.done === 1) tasksFiltredToDo.push(el);
    });

    return (
      <>
        {tasksFiltredToDo.map((task) => (
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
const mapStateToProps = (state) => {
  return {
    tasksToShow: state.tasksToShow,
    inAll: state.inAll,
    inCompleted: state.inCompleted,
    inActive: state.inActive,
    tasks: state.tasks,
  };
};

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
