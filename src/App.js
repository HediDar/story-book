import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actionCreators from "./actions/tasksActions";

// import {
//   updateTasksAction,
//   updateTasksToShowAction,
//   updateInAllAction,
//   updateInActiveAction,
//   updateInCompletedAction,
// } from "./actions/tasksActions";
import AddToDO from "./components/AddToDo";
import ToDosAndDones from "./components/ToDosAndDones";
import firestore from "./firebase/Firestore";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.increment = 0;

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";
  }

  componentDidMount() {
    // console.log(this.props);

    const db = firestore.firestore();
    db.collection("tasks").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const { inAll } = this.props;
          const { updateTasksToShowAction } = this.props;
          const { updateTasksAction } = this.props;

          const { inActive } = this.props;
          const { inCompleted } = this.props;
          const data = {
            id: change.doc.id,
            important: change.doc.data().important,
            name: change.doc.data().name,
            description: change.doc.data().description,
            done: change.doc.data().done,
          };

          // actualTasks.push(data);
          updateTasksAction(data);
          if (inAll === 1) updateTasksToShowAction(data);
          else if (inActive === 1) this.activeButtonClick();
          else if (inCompleted === 1) this.completedButtonClick();
        }

        if (change.type === "modified") {
          const { tasks } = this.props;
          const { updateTasksFromDataAction } = this.props;
          const { inAll } = this.props;
          const { inActive } = this.props;
          const { updateTasksToShowWithoutTasksAction } = this.props;
          const { inCompleted } = this.props;

          const actualTasks = tasks;
          const data = [];

          actualTasks.forEach((el) => {
            if (
              el.id === change.doc.id &&
              el.important !== change.doc.data().important
            ) {
              el.important = change.doc.data().important;
            } else if (
              el.id === change.doc.id &&
              el.done !== change.doc.data().done
            ) {
              el.done = change.doc.data().done;
            }
            data.push(el);
          });
          updateTasksFromDataAction(data);

          if (inAll === 1) updateTasksToShowWithoutTasksAction(data);
          else if (inActive === 1) this.activeButtonClick();
          else if (inCompleted === 1) this.completedButtonClick();
        }
        if (change.type === "removed") {
          const { tasks } = this.props;
          const { updateTasksFromDataAction } = this.props;
          const { updateTasksToShowWithoutTasksAction } = this.props;
          const { inActive } = this.props;
          const { inCompleted } = this.props;
          const { inAll } = this.props;

          const actualTasks = tasks;
          const data = [];
          actualTasks.forEach((el) => {
            if (el.id !== change.doc.id) {
              data.push(el);
            }
          });

          updateTasksFromDataAction(data);
          if (inAll === 1) updateTasksToShowWithoutTasksAction(data);
          else if (inActive === 1) this.activeButtonClick();
          else if (inCompleted === 1) this.completedButtonClick();
        }
      });
    });
  }

  // when we click first on add button
  handleAddToDone = (text, textArea, radio) => {
    const db = firestore.firestore();

    if (radio.localeCompare("notImportant") === 0) {
      db.collection("tasks").add({
        name: text,
        description: textArea,
        done: 0,
        important: 0,
      });
    } else {
      db.collection("tasks").add({
        name: text,
        description: textArea,
        done: 0,
        important: 1,
      });
    }
  };

  // when we click on delete task

  handleOnDoneTask = (value) => {
    const { tasks } = this.props;
    const db = firestore.firestore();
    const data = tasks;
    let doneVar = 0;

    data.forEach((el) => {
      if (el.id === value) {
        if (el.done === 1) doneVar = 1;
        else doneVar = 0;
      }
    });
    if (doneVar === 0)
      db.collection("tasks")
        .doc(value)
        .update({ done: 1 })
        .then(() => {
          console.log("update successful");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    else
      db.collection("tasks")
        .doc(value)
        .update({ done: 0 })
        .then(() => {
          console.log("update successful");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
  };

  handleonDeleteDone = (value) => {
    const db = firestore.firestore();

    db.collection("tasks")
      .doc(value)
      .delete()
      .then(() => {
        console.log("delete successful");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  handleonImportant = (value) => {
    const { tasks } = this.props;
    const db = firestore.firestore();
    const data = tasks;
    let importantVar = 0;

    data.forEach((el) => {
      if (el.id === value) {
        if (el.important === 1) importantVar = 1;
        else importantVar = 0;
      }
    });
    if (importantVar === 0)
      db.collection("tasks")
        .doc(value)
        .update({ important: 1 })
        .then(() => {
          console.log("update successful");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    else
      db.collection("tasks")
        .doc(value)
        .update({ important: 0 })
        .then(() => {
          console.log("update successful");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
  };

  allButtonClick = () => {
    const { setToSHowToTasksAction } = this.props;
    const { updateInAllAction } = this.props;
    const { updateInCompletedAction } = this.props;
    const { updateInActiveAction } = this.props;

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";

    setToSHowToTasksAction();
    updateInAllAction(1);
    updateInCompletedAction(0);
    updateInActiveAction(0);
  };

  activeButtonClick = () => {
    const { tasks } = this.props;
    const { updateTasksToShowWithoutTasksAction } = this.props;
    const { updateInAllAction } = this.props;
    const { updateInCompletedAction } = this.props;
    const { updateInActiveAction } = this.props;

    const myLoopData = tasks;
    const toUpdateTasksToShow = [];
    myLoopData.forEach((el) => {
      if (el.done === 0) {
        toUpdateTasksToShow.push(el);
      }
    });
    this.colorActif = "primary";
    this.colorAll = "secondary";
    this.colorCompleted = "secondary";

    updateTasksToShowWithoutTasksAction(toUpdateTasksToShow);
    updateInAllAction(0);
    updateInCompletedAction(0);
    updateInActiveAction(1);
  };

  completedButtonClick = () => {
    const { tasks } = this.props;
    const { updateTasksToShowWithoutTasksAction } = this.props;
    const { updateInAllAction } = this.props;
    const { updateInCompletedAction } = this.props;
    const { updateInActiveAction } = this.props;

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
    const tasksToShow2 = tasksToShow;

    return (
      <>
        <AddToDO onAddTask={this.handleAddToDone} />
        <br />
        <br />

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {tasksToShow2.length}
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
                    onClick={() => this.activeButtonClick()}
                  >
                    Show active
                  </Button>
                  <Button
                    color={this.colorCompleted}
                    onClick={() => this.completedButtonClick()}
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
                  tasks={tasksToShow2}
                  onDoneTaskApp={this.handleOnDoneTask}
                  onDeleteTaskApp={this.handleonDeleteDone}
                  onMakeImportant={this.handleonImportant}
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
  tasks: PropTypes.arrayOf(PropTypes.object),
  tasksToShow: PropTypes.arrayOf(PropTypes.object),
  inAll: PropTypes.number,
  inActive: PropTypes.number,
  inCompleted: PropTypes.number,
  updateTasksFromDataAction: PropTypes.func,
  updateTasksToShowWithoutTasksAction: PropTypes.func,
  setToSHowToTasksAction: PropTypes.func,
  updateTasksAction: PropTypes.func,
  updateTasksToShowAction: PropTypes.func,
  updateInAllAction: PropTypes.func,
  updateInActiveAction: PropTypes.func,
  updateInCompletedAction: PropTypes.func,
};

App.defaultProps = {
  inAll: 1,
  inActive: 0,
  inCompleted: 0,
  tasks: [{}],
  tasksToShow: [{}],
  updateTasksFromDataAction: () => {},
  updateTasksToShowWithoutTasksAction: () => {},
  setToSHowToTasksAction: () => {},
  updateTasksAction: () => {},
  updateTasksToShowAction: () => {},
  updateInAllAction: () => {},
  updateInActiveAction: () => {},
  updateInCompletedAction: () => {},
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  updateTasksFromDataAction: (payload) =>
    dispatch(actionCreators.updateTasksFromDataAction(payload)),
  updateTasksToShowWithoutTasksAction: (payload) =>
    dispatch(actionCreators.updateTasksToShowWithoutTasksAction(payload)),
  setToSHowToTasksAction: () =>
    dispatch(actionCreators.setToSHowToTasksAction()),
  updateTasksAction: (payload) =>
    dispatch(actionCreators.updateTasksAction(payload)),
  updateTasksToShowAction: (payload) =>
    dispatch(actionCreators.updateTasksToShowAction(payload)),
  updateInAllAction: (payload) =>
    dispatch(actionCreators.updateInAllAction(payload)),
  updateInActiveAction: (payload) =>
    dispatch(actionCreators.updateInActiveAction(payload)),
  updateInCompletedAction: (payload) =>
    dispatch(actionCreators.updateInCompletedAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
