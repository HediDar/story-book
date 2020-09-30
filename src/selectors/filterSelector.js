import { createSelector } from "reselect";

const getTasks = (state) => state.tasks;
const getDisplayMode = (state) => state.displayMode;

// eslint-disable-next-line import/prefer-default-export
export const filterTasks = createSelector(
  [getDisplayMode, getTasks],
  (displayMode, tasks) => {
    let myArray = Object.values({ ...tasks });

    if (displayMode === "all") {
      myArray.sort((a, b) => (a.important && !b.important ? 1 : -1));
      myArray.sort((a, b) => (a.done && !b.done ? 1 : -1));
      return myArray;
    }

    if (displayMode === "actif") {
      myArray.sort((a, b) => (a.important && !b.important ? 1 : -1));
      myArray.sort((a, b) => (a.done && !b.done ? 1 : -1));
      myArray = myArray.filter((el) => el.done === false);
      return myArray;
    }
    if (displayMode === "done") {
      myArray = myArray.filter((el) => el.done === true);
      return myArray;
    }
    return tasks;
  }
);

export const getButtonsColorByDisplayMode = createSelector(
  [getDisplayMode],
  (displayMode) => {
    if (displayMode === "all") {
      const colorAll = "primary";
      const colorActif = "secondary";
      const colorDone = "secondary";
      return [colorAll, colorActif, colorDone];
    }

    if (displayMode === "actif") {
      const colorAll = "secondary";
      const colorActif = "primary";
      const colorDone = "secondary";
      return [colorAll, colorActif, colorDone];
    }

    if (displayMode === "done") {
      const colorAll = "secondary";
      const colorActif = "secondary";
      const colorDone = "primary";
      return [colorAll, colorActif, colorDone];
    }
    return [];
  }
);
