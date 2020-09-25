import React, { Component } from "react";
import Table from "@material-ui/core/Table";
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

  componentDidMount() {
    // if (localStorage.getItem("tasksInLocalStorage")) {
    //   const data = JSON.parse(localStorage.getItem("tasksInLocalStorage"));
    //   if (data.length > 0) this.setState({ tasks: data, tasksToShow: data });
    // }
    // if (localStorage.getItem("incrementInLocalStorage")) {
    //   this.increment = parseInt(
    //     localStorage.getItem("incrementInLocalStorage"),
    //     10
    //   );
    // }
  }

  componentDidUpdate() {
    // const { tasks } = this.state;
    // localStorage.setItem("tasksInLocalStorage", JSON.stringify(tasks));
    // localStorage.setItem("incrementInLocalStorage", this.increment);
  }

  // when we click first on add button
  // handleAddToDone = (text, textArea, radio) => {
  //   const { tasks } = this.state;
  //   const { inAll } = this.state;
  //   const { inCompleted } = this.state;
  //   const { inActive } = this.state;
  //   const data = tasks;
  //   if (radio.localeCompare("notImportant") === 0)
  //     data.push({
  //       id: this.increment,
  //       important: 0,
  //       name: text,
  //       description: textArea,
  //       done: 0,
  //     });
  //   else
  //     data.push({
  //       id: this.increment,
  //       important: 1,
  //       name: text,
  //       description: textArea,
  //       done: 0,
  //     });

  //   this.increment += 1;
  //   this.setState({ tasks: data });

  //   if (inAll === 1) this.setState({ tasksToShow: data });
  //   else if (inActive === 1) this.activeButtonClick();
  //   else if (inCompleted === 1) this.completedButtonClick();
  // };

  // when we click on delete task

  // handleOnDoneTask = (value) => {
  //   const { tasks } = this.state;
  //   const { inAll } = this.state;
  //   const { inCompleted } = this.state;
  //   const { inActive } = this.state;
  //   const data = tasks;
  //   let k = -1;
  //   data.forEach((el) => {
  //     k += 1;
  //     if (el.id === value) {
  //       data[k].done = 1;
  //     }
  //   });
  //   this.setState({ tasks: data });
  //   if (inAll === 1) this.setState({ tasksToShow: data });
  //   else if (inActive === 1) this.activeButtonClick();
  //   else if (inCompleted === 1) this.completedButtonClick();
  // };

  // handleonDeleteDone = (value) => {
  //   const { inActive } = this.state;
  //   const { inCompleted } = this.state;
  //   const { inAll } = this.state;
  //   const { tasks } = this.state;

  //   const data = [];
  //   const actualTasks = tasks;

  //   actualTasks.forEach((el) => {
  //     if (el.id !== value) {
  //       data.push(el);
  //     }
  //   });

  //   this.setState({ tasks: data }, () => {
  //     if (inAll === 1) this.setState({ tasksToShow: tasks });
  //     else if (inActive === 1) this.activeButtonClick();
  //     else if (inCompleted === 1) this.completedButtonClick();
  //   });
  // };

  // handleonImportant = (value) => {
  //   const { tasks } = this.state;
  //   const { inAll } = this.state;
  //   const { inActive } = this.state;
  //   const { inCompleted } = this.state;

  //   const actualTasks = tasks;
  //   actualTasks.forEach((el, index) => {
  //     if (el.id === value) {
  //       if (el.important === 1) actualTasks[index].important = 0;
  //       else if (el.important === 0) actualTasks[index].important = 1;
  //     }
  //   });
  //   this.setState({ tasks: actualTasks });
  //   if (inAll === 1) this.setState({ tasksToShow: actualTasks });
  //   else if (inActive === 1) this.activeButtonClick();
  //   else if (inCompleted === 1) this.completedButtonClick();
  // };

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

  handleActiveButtonClick = () => {
    this.props.updateTestActiveAction(0);

    const { tasks } = this.props;
    const { updateTasksToShowWithoutTasksAction } = this.props;
    const { updateInAllAction } = this.props;
    const { updateInCompletedAction } = this.props;
    const { updateInActiveAction } = this.props;

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
    this.props.updateTestCompletedAction(0);

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
