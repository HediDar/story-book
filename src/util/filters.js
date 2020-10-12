function filterImportantAlwaysFirst(myArray) {
  myArray.sort((a, b) => (a.important && !b.important ? -1 : 1));
  return myArray;
}

function filterDoneAlwaysLast(myArray) {
  myArray.sort((a, b) => (a.done && !b.done ? 1 : -1));

  return myArray;
}

function filterImportantThenNotImportantThenDone(myArray) {
  myArray.sort((a, b) => (a.important && !b.important ? 1 : 1));
  myArray.sort((a, b) => (a.done && !b.done ? 1 : -1));
  return myArray;
}

function removeDone(myArray) {
  return myArray.filter((el) => el.done === false);
}

function displayOnlyDone(myArray) {
  return myArray.filter((el) => el.done === true);
}

export {
  displayOnlyDone,
  removeDone,
  filterImportantThenNotImportantThenDone,
  filterDoneAlwaysLast,
  filterImportantAlwaysFirst,
};
