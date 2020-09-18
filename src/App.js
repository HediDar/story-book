import React, { Component } from "react";
import Fields from "./components/fields";
import ToDos from "./components/toDos";
import Dones from "./components/dones";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.increment = 0;
    this.state = {
      tasks: [],
    };
  }

  // when we click first on add button
  handleAddToDone = (value) => {
    const { tasks } = this.state;
    const data = tasks;
    data.push({
      id: this.increment,
      name: value,
      done: 0,
    });
    this.increment += 1;

    this.setState({ tasks: data });
  };

  // when we click on delete task

  handleonDeleteDone = (value) => {
    const { tasks } = this.state;

    const data = [];
    const actualTasks = tasks;

    actualTasks.forEach((el) => {
      if (el.id !== value) {
        data.push(el);
      }
      this.setState({ tasks: data });
    });
  };

  handleOnDoneTask = (value) => {
    const { tasks } = this.state;
    const data = tasks;
    let k = -1;
    data.forEach((el) => {
      k += 1;
      if (el.id === value) {
        data[k].done = 1;
      }
    });
    this.setState({ tasks: data });
  };

  handleonDeleteDoneTasks = (value) => {
    const data = [];
    const { tasks } = this.state;
    const actualTasks = tasks;

    actualTasks.forEach((el) => {
      if (el.id !== value) {
        data.push(el);
      }
      this.setState({ tasks: data });
    });
  };

  render() {
    const { tasks } = this.state;
    const data = tasks;
    let testTOdo = 0;
    let testTOdone = 0;

    data.forEach((el) => {
      if (el.done === 0) testTOdo = 1;
      else testTOdone = 1;
    });

    if (testTOdo === 1 && testTOdone === 1)
      return (
        <>
          <Fields onAddTask={this.handleAddToDone} />
          <br />
          <br />
          <ToDos
            tasks={tasks}
            onDoneTaskApp={this.handleOnDoneTask}
            onDeleteTaskApp={this.handleonDeleteDone}
          />
          <br />
          <br />
          <Dones
            tasks={tasks}
            onDeleteDoneTask={this.handleonDeleteDoneTasks}
          />
        </>
      );
     if (testTOdo === 1 && testTOdone === 0)
      return (
        <>
          <Fields onAddTask={this.handleAddToDone} />
          <br />
          <br />
          <ToDos
            tasks={tasks}
            onDoneTaskApp={this.handleOnDoneTask}
            onDeleteTaskApp={this.handleonDeleteDone}
          />
          <br />
          <br />
          <h1>no data to display in done</h1>
        </>
      );
     if (testTOdo === 0 && testTOdone === 1)
      return (
        <>
          <Fields onAddTask={this.handleAddToDone} />
          <br />
          <br />
          <h1>no data to display in to do</h1>
          <br />
          <br />
          <Dones
            tasks={tasks}
            onDeleteDoneTask={this.handleonDeleteDoneTasks}
          />
        </>
      );

    return (
      <>
        <Fields onAddTask={this.handleAddToDone} />
        <br />
        <br />
        <h1>no data to display in to do</h1>
        <br />
        <br />
        <br />
        <h1>no data to display in done</h1>
      </>
    );
  }
}

export default App;
