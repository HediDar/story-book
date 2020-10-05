import React, { Component } from "react";
import PropTypes, { string } from "prop-types";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Loader from "react-loader-spinner";
import SingleTask from "./SingleTask";

import {
  filterTasks,
  getButtonsColorByDisplayMode,
} from "../selectors/filterSelector";
import * as actionCreators from "../actions/tasksActions";

class ToDosAndDones extends Component {
  componentDidMount() {
    const { fetchAllTasksByApiAction } = this.props;
    fetchAllTasksByApiAction();
  }

  onImportantHandle = (task) => {
    const taskVar = { ...task };
    const {
      setLoaderBoolToActiveAction,
      updateTaskImportantByApiAction,
    } = this.props;
    if (taskVar.important === false) taskVar.important = true;
    setLoaderBoolToActiveAction();
    updateTaskImportantByApiAction(taskVar);
  };

  onDoneHandle = (task) => {
    const taskVar = { ...task };
    const {
      setLoaderBoolToActiveAction,
      updateTaskDoneByApiAction,
    } = this.props;
    if (taskVar.done === false) taskVar.done = true;
    setLoaderBoolToActiveAction();
    updateTaskDoneByApiAction(taskVar);
  };

  onDeleteHandle = (id) => {
    const { setLoaderBoolToActiveAction, deleteTaskByApiAction } = this.props;
    setLoaderBoolToActiveAction();
    deleteTaskByApiAction({ id });
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
    const {
      displayMode,
      tasksFiltred,
      GroupButtonsColors,
      loaderBool,
    } = this.props;
    return (
      <>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {tasksFiltred.length}
                {" items displayed"}{" "}
              </TableCell>
              <TableCell align="right"> </TableCell>
              <TableCell align="right">
                {" "}
                <Loader
                  style={{ display: loaderBool ? "block" : "none" }}
                  type="ThreeDots"
                  color="#2BAD60"
                  height="100"
                  width="100"
                />{" "}
              </TableCell>
              <TableCell align="right">
                <ButtonGroup aria-label="outlined secondary button group">
                  <Button
                    color={GroupButtonsColors[0]}
                    onClick={() => this.allButtonClick()}
                  >
                    Show all
                  </Button>
                  <Button
                    color={GroupButtonsColors[1]}
                    onClick={() => this.handleActiveButtonClick()}
                  >
                    Show active
                  </Button>
                  <Button
                    color={GroupButtonsColors[2]}
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
                {tasksFiltred.map((task) => (
                  <SingleTask
                    key={task._id}
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
  fetchAllTasksByApiAction: PropTypes.func,
  updateTaskImportantByApiAction: PropTypes.func,
  deleteTaskByApiAction: PropTypes.func,
  updateTaskDoneByApiAction: PropTypes.func,
  setLoaderBoolToActiveAction: PropTypes.func,
  changeDisplayModeAction: PropTypes.func,
  displayMode: PropTypes.string,
  tasks: PropTypes.shape({}),
  loaderBool: PropTypes.bool,
  tasksFiltred: PropTypes.arrayOf(PropTypes.shape({})),
  GroupButtonsColors: PropTypes.arrayOf(string),
};

ToDosAndDones.defaultProps = {
  fetchAllTasksByApiAction: () => {},
  deleteTaskByApiAction: () => {},
  updateTaskImportantByApiAction: () => {},
  updateTaskDoneByApiAction: () => {},
  setLoaderBoolToActiveAction: () => {},
  changeDisplayModeAction: () => {},
  displayMode: "all",
  tasks: {},
  loaderBool: true,
  tasksFiltred: [{}],
  GroupButtonsColors: ["primary", "secondary", "secondary"],
};

const mapStateToProps = (state) => {
  return {
    displayMode: state.displayMode,
    tasks: state.tasks,
    loaderBool: state.loaderBool,
    tasksFiltred: filterTasks(state),
    GroupButtonsColors: getButtonsColorByDisplayMode(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLoaderBoolToActiveAction: () =>
    dispatch(actionCreators.setLoaderBoolToActiveAction()),
  updateTaskDoneByApiAction: (payload) =>
    dispatch(actionCreators.updateTaskDoneByApiAction(payload)),
  updateTaskImportantByApiAction: (payload) =>
    dispatch(actionCreators.updateTaskImportantByApiAction(payload)),
  deleteTaskByApiAction: (payload) =>
    dispatch(actionCreators.deleteTaskByApiAction(payload)),
  fetchAllTasksByApiAction: () =>
    dispatch(actionCreators.fetchAllTasksByApiAction()),
  changeDisplayModeAction: (payload) =>
    dispatch(actionCreators.changeDisplayModeAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDosAndDones);
