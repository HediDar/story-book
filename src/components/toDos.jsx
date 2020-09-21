import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ClearIcon from '@material-ui/icons/Clear';
import ToDo from "./toDo";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
    if (tasksFiltred.length>0)
    return (
      <>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>To Do's table</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>
                {" "}
                {tasksFiltred.map((task) => (
                  <ToDo
                    key={task.id}
                    task={task}
                    onDone={onDoneTaskApp}
                    onDeleteTask={onDeleteTaskApp}
                  />
                ))}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );

    return (
      <>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>To Do's table</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell align="center">
             <ClearIcon/>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
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
