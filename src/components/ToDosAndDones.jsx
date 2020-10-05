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
import { getAllTasks, deleteTask, updateTask } from "../domain/myAPIS";
import * as actionCreators from "../actions/tasksActions";

class ToDosAndDones extends Component {
  
  componentDidMount() {
    const {fetchAllTasksByApiAction}=this.props;
    fetchAllTasksByApiAction();
  }

  onImportantHandle = (task) => {
    const taskVar = { ...task };
    if (taskVar.important === false) taskVar.important = true;
    else taskVar.important = false;

    let promiseUpdate = new Promise(function (resolve, reject) {
      const responseUpdateTask = updateTask(taskVar);

      if (responseUpdateTask) {
        resolve(responseUpdateTask);
      } else {
        reject(Error("It broke"));
      }
    });
    const { makeImportantAction } = this.props;
    promiseUpdate.then(
      function (result) {
        const id = taskVar._id;
        makeImportantAction({ id });
      },
      function (err) {
        // Error: "It broke"
        console.log(err);
      }
    );
  };

  onDoneHandle = (task) => {
    const taskVar = { ...task };
    if (taskVar.done === false) taskVar.done = true;
    else taskVar.done = false;

    let promiseUpdate = new Promise(function (resolve, reject) {
      const responseUpdateTask = updateTask(taskVar);

      if (responseUpdateTask) {
        resolve(responseUpdateTask);
      } else {
        reject(Error("It broke"));
      }
    });
    const { addToDoneAction } = this.props;
    promiseUpdate.then(
      function (result) {
        const id = taskVar._id;
        addToDoneAction({ id });
      },
      function (err) {
        // Error: "It broke"
        console.log(err);
      }
    );
  };

  onDeleteHandle = (id) => {
    let promiseDelete = new Promise(function (resolve, reject) {
      const responseDeleteTask = deleteTask(id);

      if (responseDeleteTask) {
        resolve(responseDeleteTask);
      } else {
        reject(Error("It broke"));
      }
    });
    const { removeTaskAction } = this.props;
    promiseDelete.then(
      function (result) {
        console.log("result deleted");
        removeTaskAction({ id });
      },
      function (err) {
        // Error: "It broke"
        console.log(err);
      }
    );
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
  makeImportantAction: PropTypes.func,
  initialiseAllTasksAction: PropTypes.func,
  addToDoneAction: PropTypes.func,
  removeTaskAction: PropTypes.func,
  changeDisplayModeAction: PropTypes.func,
  displayMode: PropTypes.string,
  tasks: PropTypes.shape({}),
  tasksFiltred: PropTypes.arrayOf(PropTypes.shape({})),
  GroupButtonsColors: PropTypes.arrayOf(string),
};

ToDosAndDones.defaultProps = {
  makeImportantAction: () => {},
  initialiseAllTasksAction: () => {},
  removeTaskAction: () => {},
  addToDoneAction: () => {},
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
  fetchAllTasksByApiAction: () =>
    dispatch(actionCreators.fetchAllTasksByApiAction()),
  initialiseAllTasksAction: (payload) =>
    dispatch(actionCreators.initialiseAllTasksAction(payload)),
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
