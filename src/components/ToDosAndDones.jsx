import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SingleTask from "./SingleTask";
import { filterTasks } from "../selectors/filterSelector";
import * as actionCreators from "../actions/tasksActions";

class ToDosAndDones extends Component {
  onImportantHandle = (id) => {
    const { makeImportantAction } = this.props;
    makeImportantAction({ id });
  };

  onDoneHandle = (id) => {
    const { addToDoneAction } = this.props;
    addToDoneAction({ id });
  };

  onDeleteHandle = (id) => {
    const { removeTaskAction } = this.props;

    removeTaskAction({ id });
  };

  allButtonClick = () => {
    const { changeDisplayModeAction } = this.props;
    changeDisplayModeAction("all");
  };

  handleActiveButtonClick = () => {
    const { changeDisplayModeAction } = this.props;
    changeDisplayModeAction("actif");
  };

  handleAllcompletedButtonClick = () => {
    const { changeDisplayModeAction } = this.props;
    changeDisplayModeAction("done");
  };

  render() {
    const { displayMode, tasksFiltred } = this.props;
    return (
      <>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {tasksFiltred.myArray.length}
                {" items displayed"}{" "}
              </TableCell>
              <TableCell align="right"> </TableCell>
              <TableCell align="right"> </TableCell>
              <TableCell align="right">
                <ButtonGroup aria-label="outlined secondary button group">
                  <Button
                    color={tasksFiltred.colorAll}
                    onClick={() => this.allButtonClick()}
                  >
                    Show all
                  </Button>
                  <Button
                    color={tasksFiltred.colorActif}
                    onClick={() => this.handleActiveButtonClick()}
                  >
                    Show active
                  </Button>
                  <Button
                    color={tasksFiltred.colorCompleted}
                    onClick={() => this.handleAllcompletedButtonClick()}
                  >
                    Show completed
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan="4" component="th" scope="row">
                {tasksFiltred.myArray.map((task) => (
                  <SingleTask
                    key={task.id}
                    task={task}
                    displayMode={displayMode}
                    onDone={this.onDoneHandle}
                    onDeleteTask={this.onDeleteHandle}
                    onImportant={this.onImportantHandle}
                  />
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
  }
}

ToDosAndDones.propTypes = {
  makeImportantAction: PropTypes.func,
  addToDoneAction: PropTypes.func,
  removeTaskAction: PropTypes.func,
  changeDisplayModeAction: PropTypes.func,
  displayMode: PropTypes.string,
  tasks: PropTypes.shape({}),
  tasksFiltred: PropTypes.shape({}),
};

ToDosAndDones.defaultProps = {
  makeImportantAction: () => {},
  removeTaskAction: () => {},
  addToDoneAction: () => {},
  changeDisplayModeAction: () => {},
  displayMode: "all",
  tasks: {},
  tasksFiltred: {},
};

const mapStateToProps = (state) => {
  return {
    displayMode: state.displayMode,
    tasks: state.tasks,
    tasksFiltred: filterTasks(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeDisplayModeAction: (payload) =>
    dispatch(actionCreators.changeDisplayModeAction(payload)),
  removeTaskAction: (payload) =>
    dispatch(actionCreators.removeTaskAction(payload)),
  addToDoneAction: (payload) =>
    dispatch(actionCreators.addToDoneAction(payload)),
  makeImportantAction: (payload) =>
    dispatch(actionCreators.makeImportantAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDosAndDones);
