import {
  displayOnlyDone,
  removeDone,
  filterImportantThenNotImportantThenDone,
  filterImportantAlwaysFirst,
} from "../src/util/filters";

describe("Filter functions actif", () => {
  it("done removed", () => {
    const input = [
      { id: 3, important: true, done: false },
      { id: 1, important: false, done: false },
      { id: 4, important: false, done: true },
      { id: 2, important: true, done: true },
    ];

    const output = [
      { id: 3, important: true, done: false },
      { id: 1, important: false, done: false },
    ];

    expect(removeDone(input)).toEqual(output);
  });
});

describe("Filter functions final filter", () => {
  it("important +!done, not important+!done, then done", () => {
    const input = [
      { id: 1, important: false, done: false },
      { id: 2, important: true, done: true },
      { id: 3, important: true, done: false },
      { id: 4, important: false, done: true },
    ];

    const output = [
      { id: 3, important: true, done: false },
      { id: 1, important: false, done: false },
      { id: 4, important: false, done: true },
      { id: 2, important: true, done: true },
    ];

    expect(filterImportantThenNotImportantThenDone(input)).toEqual(output);
  });
});

describe("Filter functions done", () => {
  it("only done displayed", () => {
    const input = [
      { id: 0, important: false, done: true },
      { id: 3, important: true, done: false },
      { id: 1, important: false, done: false },
      { id: 4, important: false, done: true },
      { id: 2, important: true, done: true },
    ];

    const output = [
      { id: 0, important: false, done: true },
      { id: 4, important: false, done: true },
      { id: 2, important: true, done: true },
    ];

    expect(displayOnlyDone(input)).toEqual(output);
  });
});

// describe("Filter functions all", () => {
//   it("important should come always first length 9", () => {
//     const input3 = [
//       { id: 1, important: false, done: false },
//       { id: 2, important: true, done: true },
//       { id: 4, important: true, done: true },
//       { id: 5, important: false, done: false },
//       { id: 6, important: true, done: false },
//       { id: 7, important: false, done: true },
//       { id: 8, important: true, done: false },
//       { id: 9, important: true, done: false },
//       { id: 10, important: false, done: true },
//     ];

//     const output3 = [
//       { id: 9, important: true, done: false },
//       { id: 8, important: true, done: false },
//       { id: 6, important: true, done: false },
//       { id: 4, important: true, done: true },
//       { id: 2, important: true, done: true },

//       { id: 1, important: false, done: false },
//       { id: 5, important: false, done: false },
//       { id: 7, important: false, done: true },
//       { id: 10, important: false, done: true },
//     ];

//     expect(filterImportantAlwaysFirst(input3)).toEqual(output3);
//   });
// });
