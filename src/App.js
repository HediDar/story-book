import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import AddToDo from "./components/AddToDo";
import ToDosAndDones from "./components/ToDosAndDones";
import * as actionCreators from "./actions/tasksActions";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";
  }

  allButtonClick = () => {
    const {
      setToSHowToTasksAction,
      updateInAllAction,
      updateInCompletedAction,
      updateInActiveAction,
    } = this.props;

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";

    setToSHowToTasksAction();
    updateInAllAction(1);
    updateInCompletedAction(0);
    updateInActiveAction(0);
  };

  handleActiveButtonClick = () => {
    const {
      tasks,
      updateTasksToShowWithoutTasksAction,
      updateTestActiveAction,
      updateInAllAction,
      updateInCompletedAction,
      updateInActiveAction,
    } = this.props;
    updateTestActiveAction(0);

    const data = tasks.filter((el) => el.done === 0);

    this.colorActif = "primary";
    this.colorAll = "secondary";
    this.colorCompleted = "secondary";

    updateTasksToShowWithoutTasksAction(data);
    updateInAllAction(0);
    updateInCompletedAction(0);
    updateInActiveAction(1);
  };

  handleAllcompletedButtonClick = () => {
    const {
      updateInActiveAction,
      updateInCompletedAction,
      tasks,
      updateTestCompletedAction,
      updateTasksToShowWithoutTasksAction,
      updateInAllAction,
    } = this.props;

    updateTestCompletedAction(0);

    const myLoopData = tasks;
    const toUpdataTasksToShow = [];
    myLoopData.forEach((el) => {
      if (el.done === 1) {
        toUpdataTasksToShow.push(el);
      }
    });
    this.colorActif = "secondary";
    this.colorAll = "secondary";
    this.colorCompleted = "primary";

    updateTasksToShowWithoutTasksAction(toUpdataTasksToShow);

    updateInAllAction(0);
    updateInCompletedAction(1);
    updateInActiveAction(0);
  };

  render() {
    const { tasksToShow } = this.props;

    return (
      <>
        <AddToDo
          onAll={this.allButtonClick}
          onActive={this.handleActiveButtonClick}
          onCompleted={this.handleAllcompletedButtonClick}
        />
        <br />
        <br />

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {tasksToShow.length}
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
                <ToDosAndDones
                  onAll2={this.allButtonClick}
                  onActive2={this.handleActiveButtonClick}
                  onCompleted2={this.handleAllcompletedButtonClick}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
  }
}

App.propTypes = {
  setToSHowToTasksAction: PropTypes.func,
  updateInAllAction: PropTypes.func,
  updateInCompletedAction: PropTypes.func,
  updateInActiveAction: PropTypes.func,
  updateTasksToShowWithoutTasksAction: PropTypes.func,
  updateTestActiveAction: PropTypes.func,
  updateTestCompletedAction: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.object),
  tasksToShow: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  updateTestCompletedAction: () => {},
  updateTasksToShowWithoutTasksAction: () => {},
  updateTestActiveAction: () => {},
  setToSHowToTasksAction: () => {},
  updateInAllAction: () => {},
  updateInCompletedAction: () => {},
  updateInActiveAction: () => {},
  tasksToShow: [{}],
  tasks: [{}],
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  updateTestActiveAction: (payload) =>
    dispatch(actionCreators.updateTestActiveAction(payload)),
  updateTestCompletedAction: (payload) =>
    dispatch(actionCreators.updateTestCompletedAction(payload)),
  setToSHowToTasksAction: () =>
    dispatch(actionCreators.setToSHowToTasksAction()),
  updateTasksToShowWithoutTasksAction: (payload) =>
    dispatch(actionCreators.updateTasksToShowWithoutTasksAction(payload)),
  updateInAllAction: (payload) =>
    dispatch(actionCreators.updateInAllAction(payload)),
  updateInActiveAction: (payload) =>
    dispatch(actionCreators.updateInActiveAction(payload)),
  updateInCompletedAction: (payload) =>
    dispatch(actionCreators.updateInCompletedAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
