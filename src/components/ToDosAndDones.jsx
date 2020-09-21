import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ClearIcon from "@material-ui/icons/Clear";
import ToDo from "./ToDo";
import Done from "./Done";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class ToDosAndDones extends Component {
  componentDidMount() {}

  render() {
    const { tasks } = this.props;
    const { onDoneTaskApp } = this.props;
    const { onDeleteTaskApp } = this.props;

    const myTasks = tasks;
    const tasksFiltredToDo = [];
    const tasksFiltredDone = [];

    myTasks.forEach((el) => {
      if (el.done === 0) tasksFiltredToDo.push(el);
      else tasksFiltredDone.push(el);
    });

    return (
      <>
        {" "}
        {tasksFiltredToDo.map((task) => (
          <ToDo
            key={task.id}
            task={task}
            onDone={onDoneTaskApp}
            onDeleteTask={onDeleteTaskApp}
          />
        ))}
        <br />
        <br />{" "}
        {tasksFiltredDone.map((task) => (
          <Done key={task.id} task={task} onDeleteDone={onDeleteTaskApp} />
        ))}
      </>
    );
  }
}
// ToDos.propTypes = {
//   tasks: PropTypes.arrayOf(PropTypes.object),
//   onDoneTaskApp: PropTypes.func,
//   onDeleteTaskApp: PropTypes.func,
// };
// ToDos.defaultProps = {
//   tasks: [{}],
//   onDoneTaskApp: () => {},
//   onDeleteTaskApp: () => {},
// };
export default ToDosAndDones;
