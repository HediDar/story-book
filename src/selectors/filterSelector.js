import { createSelector } from "reselect";

const getTasks = (state) => state.tasks;
const getDisplayMode = (state) => state.displayMode;

// eslint-disable-next-line import/prefer-default-export
export const filterTasks = createSelector(
  [getDisplayMode, getTasks],
  (displayMode, tasks) => {
    let myArray = Object.values({ ...tasks });

    if (displayMode !== "done") {
      myArray.sort((a, b) => (a.important && !b.important ? 1 : -1));
      myArray.sort((a, b) => (a.done && !b.done ? 1 : -1));
      let colorActif = "secondary";
      let colorAll = "primary";
      const colorCompleted = "secondary";
      if (displayMode === "actif") {
        myArray = myArray.filter((el) => el.done === false);
        colorActif = "primary";
        colorAll = "secondary";
      }
      return {myArray, colorAll, colorActif, colorCompleted};
    }
    myArray = myArray.filter((el) => el.done === true);
    const colorActif = "secondary";
    const colorAll = "secondary";
    const colorCompleted = "primary";
    return {myArray, colorAll, colorActif, colorCompleted};
  }
);
