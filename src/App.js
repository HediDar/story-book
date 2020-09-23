import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import {
  updateTasksAction,
  updateTasksToShowAction,
  updateInAllAction,
  updateInActiveAction,
  updateInCompletedAction,
} from "./actions/tasksActions";
import AddToDO from "./components/AddToDo";
import ToDosAndDones from "./components/ToDosAndDones";
import firestore from "./firebase/Firestore";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.increment = 0;

    this.state = {
      tasksToShow: [],
      tasks: [],
      inAll: 1,
      inActive: 0,
      inCompleted: 0,
    };

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";
  }

  componentDidMount() {



    const db = firestore.firestore();
    db.collection("tasks").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const { inAll } = this.state;
          const { inCompleted } = this.state;
          const { inActive } = this.state;
          const { tasks } = this.state;
          const actualTasks = tasks;
          let data = [];
          data = {
            id: change.doc.id,
            important: change.doc.data().important,
            name: change.doc.data().name,
            description: change.doc.data().description,
            done: change.doc.data().done,
          };

          actualTasks.push(data);
          this.setState({ tasks: actualTasks });
          if (inAll === 1) this.setState({ tasksToShow: actualTasks });
          else if (inActive === 1) this.activeButtonClick();
          else if (inCompleted === 1) this.completedButtonClick();
        }

        if (change.type === "modified") {
          const { inAll } = this.state;
          const { inCompleted } = this.state;
          const { inActive } = this.state;
          const { tasks } = this.state;
          const actualTasks = tasks;
          let data = [];

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

          this.setState({ tasks: data });
          if (inAll === 1) this.setState({ tasksToShow: data });
          else if (inActive === 1) this.activeButtonClick();
          else if (inCompleted === 1) this.completedButtonClick();
        }
        if (change.type === "removed") {
          const { inAll } = this.state;
          const { inCompleted } = this.state;
          const { inActive } = this.state;
          const { tasks } = this.state;
          const actualTasks = tasks;
          const data = [];
          actualTasks.forEach((el) => {
            if (el.id !== change.doc.id) {
              data.push(el);
            }
          });

          this.setState({ tasks: data });
          if (inAll === 1) this.setState({ tasksToShow: data });
          else if (inActive === 1) this.activeButtonClick();
          else if (inCompleted === 1) this.completedButtonClick();
        }
      });
    });
  }

  // when we click first on add button
  handleAddToDone = (text, textArea, radio) => {

    this.props.updateInActiveAction(10);



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
    const db = firestore.firestore();
    const { tasks } = this.state;
    const data = tasks;
    console.log(db.collection("tasks").doc(value));
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
    const db = firestore.firestore();
    const { tasks } = this.state;
    const data = tasks;
    console.log(db.collection("tasks").doc(value));
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
    const { tasks } = this.state;
    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";
    this.setState({
      tasksToShow: tasks,
      inAll: 1,
      inActive: 0,
      inCompleted: 0,
    });
  };

  activeButtonClick = () => {
    const { tasks } = this.state;
    const myLoopData = tasks;
    const toUpdataTasksToShow = [];
    myLoopData.forEach((el) => {
      if (el.done === 0) {
        toUpdataTasksToShow.push(el);
      }
    });
    this.colorActif = "primary";
    this.colorAll = "secondary";
    this.colorCompleted = "secondary";
    this.setState({
      tasksToShow: toUpdataTasksToShow,
      inAll: 0,
      inActive: 1,
      inCompleted: 0,
    });
  };

  completedButtonClick = () => {
    const { tasks } = this.state;
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
    this.setState({
      tasksToShow: toUpdataTasksToShow,
      inAll: 0,
      inActive: 0,
      inCompleted: 1,
    });
  };

  render() {
    const { tasksToShow } = this.state;

    return (
      <>
        <AddToDO onAddTask={this.handleAddToDone} />
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
                  tasks={tasksToShow}
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

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  updateTasksAction: () => dispatch(updateTasksAction),
  updateTasksToShowAction: () => dispatch(updateTasksToShowAction),
  updateInAllAction: () => dispatch(updateInAllAction),
  updateInActiveAction: () => dispatch(updateInActiveAction),
  updateInCompletedAction: () => dispatch(updateInCompletedAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
