import React from "react";

import AddToDo from "./components/AddToDo";
import ToDosAndDones from "./components/ToDosAndDones";

import "./App.css";

const App = () => {
  return (
    <>
      <h1>hello</h1>
      <AddToDo />
      <br />
      <br />
      <ToDosAndDones />
    </>
  );
};

export default App;
