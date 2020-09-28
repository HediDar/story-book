import React from "react";

import AddToDo from "./components/AddToDo";
import ToDosAndDones from "./components/ToDosAndDones";

import "./App.css";

const App = () => {
  return (
    <>
      <AddToDo />
      <br />
      <br />
      <ToDosAndDones />
    </>
  );
};

export default App;
