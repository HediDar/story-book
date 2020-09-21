import React, { Component } from "react";
import PropTypes from "prop-types";
import SingleTask from "./SingleTask";

class ToDosAndDones extends Component {
  componentDidMount() {}

  render() {
    const { tasks } = this.props;
    const { onDoneTaskApp } = this.props;
    const { onDeleteTaskApp } = this.props;

    const myTasks = tasks;
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
            onDone={onDoneTaskApp}
            onDeleteTask={onDeleteTaskApp}
          />
        ))}
      </>
    );
  }
}
ToDosAndDones.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDoneTaskApp: PropTypes.func,
  onDeleteTaskApp: PropTypes.func,
};
ToDosAndDones.defaultProps = {
  tasks: [{}],
  onDoneTaskApp: () => {},
  onDeleteTaskApp: () => {},
};
export default ToDosAndDones;
