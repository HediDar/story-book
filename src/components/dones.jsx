import React, { Component } from "react";
import Done from "./done";

class Dones extends Component {
  componentDidMount() {}

  render() {
    const myTasks = this.props.tasks;
    const tasksFiltred = [];

    myTasks.forEach((el) => {
      if (el.done === 1) {
        tasksFiltred.push(el);
      }
    });

    return (
      <>
        {tasksFiltred.map((task) => (
          <Done
            key={task.id}
            task={task}
            onDeleteDone={this.props.onDeleteDoneTask}
          />
        ))}
      </>
    );
  }
}

export default Dones;
