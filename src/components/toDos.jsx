import React, { Component } from "react";
import ToDo from "./toDo";

class ToDos extends Component {
  componentDidMount() {}

  render() {
    const myTasks = this.props.tasks;
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
            onDone={this.props.onDoneTaskApp}
            onDeleteTask={this.props.onDeleteTaskApp}
          />
        ))}
      </>
    );
  }
}

export default ToDos;
