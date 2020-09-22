import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddToDO from "./components/AddToDo";
import ToDosAndDones from "./components/ToDosAndDones";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.increment = 0;
    this.state = {
      tasks: [],
      tasksToShow: [],
      inAll: 1,
      inActive: 0,
      inCompleted: 0,
    };
    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";
  }

  componentDidMount() {
    if (localStorage.getItem("tasksInLocalStorage")) {
      const data = JSON.parse(localStorage.getItem("tasksInLocalStorage"));
      if (data.length > 0) this.setState({ tasks: data, tasksToShow: data });
    }

    if (localStorage.getItem("incrementInLocalStorage")) {
      this.increment = parseInt(
        localStorage.getItem("incrementInLocalStorage"),
        10
      );
    }
  }

  componentDidUpdate() {
    const { tasks } = this.state;

    localStorage.setItem("tasksInLocalStorage", JSON.stringify(tasks));
    localStorage.setItem("incrementInLocalStorage", this.increment);
  }

  // when we click first on add button
  handleAddToDone = (text, textArea, radio) => {
    const { tasks } = this.state;
    const { inAll } = this.state;
    const { inCompleted } = this.state;
    const { inActive } = this.state;
    const data = tasks;
    if (radio.localeCompare("notImportant") === 0)
      data.push({
        id: this.increment,
        important: 0,
        name: text,
        description: textArea,
        done: 0,
      });
    else
      data.push({
        id: this.increment,
        important: 1,
        name: text,
        description: textArea,
        done: 0,
      });

    this.increment += 1;
    this.setState({ tasks: data });

    if (inAll === 1) this.setState({ tasksToShow: data });
    else if (inActive === 1) this.activeButtonClick();
    else if (inCompleted === 1) this.completedButtonClick();
  };

  // when we click on delete task

  handleOnDoneTask = (value) => {
    const { tasks } = this.state;
    const { inAll } = this.state;
    const { inCompleted } = this.state;
    const { inActive } = this.state;
    const data = tasks;
    let k = -1;
    data.forEach((el) => {
      k += 1;
      if (el.id === value) {
        data[k].done = 1;
      }
    });
    this.setState({ tasks: data });
    if (inAll === 1) this.setState({ tasksToShow: data });
    else if (inActive === 1) this.activeButtonClick();
    else if (inCompleted === 1) this.completedButtonClick();
  };

  handleonDeleteDone = (value) => {
    const { inActive } = this.state;
    const { inCompleted } = this.state;
    const { inAll } = this.state;
    const { tasks } = this.state;

    const data = [];
    const actualTasks = tasks;

    actualTasks.forEach((el) => {
      if (el.id !== value) {
        data.push(el);
      }
    });

    this.setState({ tasks: data }, () => {
      if (inAll === 1) this.setState({ tasksToShow: tasks });
      else if (inActive === 1) this.activeButtonClick();
      else if (inCompleted === 1) this.completedButtonClick();
    });
  };

  handleonImportant = (value) => {
    const { tasks } = this.state;
    const { inAll } = this.state;
    const { inActive } = this.state;
    const { inCompleted } = this.state;

    const actualTasks = tasks;
    actualTasks.forEach((el, index) => {
      if (el.id === value) {
        if (el.important === 1) actualTasks[index].important = 0;
        else if (el.important === 0) actualTasks[index].important = 1;
      }
    });
    this.setState({ tasks: actualTasks });
    if (inAll === 1) this.setState({ tasksToShow: actualTasks });
    else if (inActive === 1) this.activeButtonClick();
    else if (inCompleted === 1) this.completedButtonClick();
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

export default App;
