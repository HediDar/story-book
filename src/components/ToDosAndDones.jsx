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
import * as actionCreators from "../actions/tasksActions";

class ToDosAndDones extends Component {
  constructor() {
    super();

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";
  }

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

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";

    changeDisplayModeAction("all");
  };

  handleActiveButtonClick = () => {
    const { changeDisplayModeAction } = this.props;

    this.colorActif = "primary";
    this.colorAll = "secondary";
    this.colorCompleted = "secondary";

    changeDisplayModeAction("actif");
  };

  handleAllcompletedButtonClick = () => {
    const { changeDisplayModeAction } = this.props;

    this.colorActif = "secondary";
    this.colorAll = "secondary";
    this.colorCompleted = "primary";

    changeDisplayModeAction("done");
  };

  render() {
    const { tasks, displayMode } = this.props;
    let myArray = Object.values({ ...tasks });

    if (displayMode !== "done") {
      myArray.sort((a, b) => (a.important > b.important ? 1 : -1));
      myArray.sort((a, b) => (a.done > b.done ? 1 : -1));

      if (displayMode === "actif")
        myArray = myArray.filter((el) => el.done === 0);
    } else myArray = myArray.filter((el) => el.done === 1);

    return (
      <>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {myArray.length}
                {" items displayed"}{" "}
              </TableCell>
              <TableCell align="right"> </TableCell>
              <TableCell align="right"> </TableCell>
              <TableCell align="right">
                <ButtonGroup aria-label="outlined secondary button group">
                  <Button
                    color={this.colorAll}
                    onClick={() => this.allButtonClick()}
                  >
                    Show all
                  </Button>
                  <Button
                    color={this.colorActif}
                    onClick={() => this.handleActiveButtonClick()}
                  >
                    Show active
                  </Button>
                  <Button
                    color={this.colorCompleted}
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
                {myArray.map((task) => (
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
};

ToDosAndDones.defaultProps = {
  makeImportantAction: () => {},
  removeTaskAction: () => {},
  addToDoneAction: () => {},
  changeDisplayModeAction: () => {},
  displayMode: "all",
  tasks: {},
};

const mapStateToProps = (state) => {
  return {
    displayMode: state.displayMode,
    tasks: state.tasks,
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
