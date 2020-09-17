import React, { Component } from "react";

class Done extends Component {
  render() {
    //if (this.props.task.done === 1)
      return (
        <>
          <li>
            <label>
              {this.props.task.name}
              {"    "}
            </label>

            <button onClick={() => this.props.onDeleteDone(this.props.task.id)}>
              Delete
            </button>
          </li>
        </>
      );
    return null;
  }
}

export default Done;
