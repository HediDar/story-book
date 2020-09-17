import React, { Component } from "react";
import Fields from "./components/fields";
import ToDos from "./components/toDos";
import Dones from "./components/dones";

import "./App.css";

class App extends Component {
  state = {
    tasks: [],
  };

  constructor() {
    super();
    this.increment = 0;
    this.state = {
      tasks: [],
      addValue: "",
    };
  }

  ////////when we click first on add button
  handleAddToDone = (value) => {
    let data = this.state.tasks;
    data.push({
      id: this.increment,
      name: value,
      done: 0,
    });
    this.increment++;

    this.setState({ tasks: data });
  };

  ////////when we click on delete task

  handleonDeleteDone = (value) => {
    const data = [];
    const actualTasks = this.state.tasks;

    actualTasks.forEach((el) => {
      if (el.id !== value) {
        data.push(el);
      }
      this.setState({ tasks: data });
    });
  };

  handleOnDoneTask = (value) => {
    let data = this.state.tasks;
    let k = -1;
    data.forEach((el) => {
      k++;
      if (el.id === value) {
        data[k].done = 1;
      }
    });
    this.setState({ tasks: data });
  };

  handleonDeleteDoneTasks = (value) => {
    const data = [];
    const actualTasks = this.state.tasks;

    actualTasks.forEach((el) => {
      if (el.id !== value) {
        data.push(el);
      }
      this.setState({ tasks: data });
    });
  };

  render() {
    let data = this.state.tasks;
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
          <br></br>
          <br></br>
          <ToDos
            tasks={this.state.tasks}
            onDoneTaskApp={this.handleOnDoneTask}
            onDeleteTaskApp={this.handleonDeleteDone}
          />
          <br></br>
          <br></br>
          <Dones
            tasks={this.state.tasks}
            onDeleteDoneTask={this.handleonDeleteDoneTasks}
          />
        </>
      );
    else if (testTOdo === 1 && testTOdone === 0)
      return (
        <>
          <Fields onAddTask={this.handleAddToDone} />
          <br></br>
          <br></br>
          <ToDos
            tasks={this.state.tasks}
            onDoneTaskApp={this.handleOnDoneTask}
            onDeleteTaskApp={this.handleonDeleteDone}
          />
          <br></br>
          <br></br>
          <h1>no data to display in done</h1>
        </>
      );
    else if (testTOdo === 0 && testTOdone === 1)
      return (
        <>
          <Fields onAddTask={this.handleAddToDone} />
          <br></br>
          <br></br>
          <h1>no data to display in to do</h1>
          <br></br>
          <br></br>
          <Dones
            tasks={this.state.tasks}
            onDeleteDoneTask={this.handleonDeleteDoneTasks}
          />
        </>
      );

    return (
      <>
        <Fields onAddTask={this.handleAddToDone} />
        <br></br>
        <br></br>
        <h1>no data to display in to do</h1>
        <br></br>
        <br></br>
        <br></br>
        <h1>no data to display in done</h1>
      </>
    );
  }
}

export default App;
