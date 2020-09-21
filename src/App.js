import React, { Component } from "react";
import AddToDO from "./components/AddToDo";
import ToDosAndDones from "./components/ToDosAndDones";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.increment = 0;
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("tasksInLocalStorage")) {
      const data = JSON.parse(localStorage.getItem("tasksInLocalStorage"));
      if (data.length > 0) this.setState({ tasks: data });
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
    const data = tasks;
    if (radio.localeCompare("notImportant") === 0)
    data.push({
      id: this.increment,
      important:0,
      name: text,
      description: textArea,
      done: 0,
    });
else
    data.push({
      id: this.increment,
      important:1,
      name: text,
      description: textArea,
      done: 0,
    });

    this.increment += 1;

    this.setState({ tasks: data });
  };

  // when we click on delete task

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

  handleonDeleteDone = (value) => {
    const { tasks } = this.state;

    const data = [];
    const actualTasks = tasks;

    actualTasks.forEach((el) => {
      if (el.id !== value) {
        data.push(el);
      }
    });
    this.setState({ tasks: data });
  };

  render() {
    const { tasks } = this.state;

    return (
      <>
        <AddToDO onAddTask={this.handleAddToDone} />
        <br />
        <br />

        <ToDosAndDones
          tasks={tasks}
          onDoneTaskApp={this.handleOnDoneTask}
          onDeleteTaskApp={this.handleonDeleteDone}
        />
      </>
    );
  }
}

export default App;
