import React, { Component } from "react";

class Fields extends Component {
  render() {
    var title = this.title;
    return (
      <>
        <table>
          <tr>
            <td>
              <input
                ref={(c) => (this.title = c)}
                type="text"
                placeholder="task name"
              />
            </td>

            <td>
              <button onClick={() => this.props.onAddTask(this.title.value)}>
                add a task
              </button>
            </td>
          </tr>
        </table>
      </>
    );
  }
}

export default Fields;
