import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Done from "./done";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Dones = (props) => {
  const { tasks } = props;
  const { onDeleteDoneTask } = props;

  const myTasks = tasks;
  const tasksFiltred = [];

  myTasks.forEach((el) => {
    if (el.done === 1) {
      tasksFiltred.push(el);
    }
  });
  if (tasksFiltred.length>0)

  return (
    <>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Done's table</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell>
              {" "}
              {tasksFiltred.map((task) => (
                <Done
                  key={task.id}
                  task={task}
                  onDeleteDone={onDeleteDoneTask}
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
            <StyledTableCell>Done's table</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell>
            No data found
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

Dones.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleteDoneTask: PropTypes.func,
};

Dones.defaultProps = {
  tasks: [{}],
  onDeleteDoneTask: () => {},
};

export default Dones;
