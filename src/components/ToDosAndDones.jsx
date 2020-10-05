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
    if (taskVar.important === false) taskVar.important = true;

    this.props.updateTaskImportantByApiAction(taskVar);
  };

  onDoneHandle = (task) => {
    const taskVar = { ...task };
    if (taskVar.done === false) taskVar.done = true;

    this.props.updateTaskDoneByApiAction(taskVar);
  };

  onDeleteHandle = (id) => {
    this.props.deleteTaskByApiAction({ id });
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
    const { displayMode, tasksFiltred, GroupButtonsColors } = this.props;
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
              <TableCell align="right"> </TableCell>
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
  changeDisplayModeAction: PropTypes.func,
  displayMode: PropTypes.string,
  tasks: PropTypes.shape({}),
  tasksFiltred: PropTypes.arrayOf(PropTypes.shape({})),
  GroupButtonsColors: PropTypes.arrayOf(string),
};

ToDosAndDones.defaultProps = {
  changeDisplayModeAction: () => {},
  displayMode: "all",
  tasks: {},
  tasksFiltred: [{}],
  GroupButtonsColors: ["primary", "secondary", "secondary"],
};

const mapStateToProps = (state) => {
  return {
    displayMode: state.displayMode,
    tasks: state.tasks,
    tasksFiltred: filterTasks(state),
    GroupButtonsColors: getButtonsColorByDisplayMode(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
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
