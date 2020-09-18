import React, { Component } from "react";
import PropTypes from "prop-types";
import ToDo from "./toDo";

class ToDos extends Component {
  componentDidMount() {}

  render() {
    const { tasks } = this.props;
    const { onDoneTaskApp } = this.props;
    const { onDeleteTaskApp } = this.props;

    const myTasks = tasks;
    const tasksFiltred = [];

    myTasks.forEach((el) => {
      if (el.done === 0) {
        tasksFiltred.push(el);
      }
    });
    return (
      <>
        {tasksFiltred.map((task) => (
          <ToDo
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

ToDos.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDoneTaskApp: PropTypes.func,
  onDeleteTaskApp: PropTypes.func,
};

ToDos.defaultProps = {
  tasks: [{}],
  onDoneTaskApp: () => {},
  onDeleteTaskApp: () => {},
};

export default ToDos;
