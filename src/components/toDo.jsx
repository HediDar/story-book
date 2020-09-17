import React, { Component } from "react";

class ToDo extends Component {
  render() {
    //if (this.props.task.done === 0)
      return (
        <>
          <li>
            <label>
              {this.props.task.name}
              {"    "}
            </label>

            <button onClick={() => this.props.onDone(this.props.task.id)}>
              add to done
            </button>
            <label>{"   "}</label>
            <button onClick={() => this.props.onDeleteTask(this.props.task.id)}>
              Delete
            </button>
          </li>
        </>
      );
    return null;
  }
}

export default ToDo;
