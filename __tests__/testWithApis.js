import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../src/domain/myAPIS";

jest.mock("../__mocks__/axios");

it("works with promises", () => {
  const output = [
    {
      _id: "5f7c61ef72e7de0017f59ce6",
      name: "important task",
      description: "",
      important: true,
      done: true,
    },

    {
      _id: "5f7d9c19fffee20017541c25",
      name: "Test from Bouba",
      description: "This is just a test",
      important: false,
      done: true,
    },
    {
      _id: "5f7d9c88fffee20017541c26",
      name: "Hello from Hamza",
      description: "",
      important: false,
      done: false,
    },
    {
      _id: "5f7da19afffee20017541c27",
      name: "Integration of Github Actions",
      description: "",
      important: false,
      done: false,
    },
    {
      _id: "5f7f0714938a2e0017049866",
      name: "first task",
      description: "",
      important: false,
      done: false,
    },
  ];

  expect.assertions(1);
  return getAllTasks().then((data) => expect(data).toEqual(output));
});

it("delete task", () => {
  expect.assertions(1);
  return deleteTask({ id: 5 }).then((data) =>
    expect(data).toEqual("delete successfull")
  );
});

it("update task", () => {
  expect.assertions(1);
  return updateTask({ id: 5 }).then((data) =>
    expect(data).toEqual("update successful")
  );
});

it("add task", () => {
  expect.assertions(1);
  return addTask({
    id: 5,
    name: "test",
    description: "a",
    done: true,
    important: true,
  }).then((data) => expect(data).toEqual("task added"));
});

it("delete task rejected", () => {
  return deleteTask({ id: 0 }).catch((e) => {
    console.log("test fail");
    expect(e).toEqual({ error: "Task not found." });
  });
});

// it("delete task rejected", () => {
//   expect.assertions(1);
//   return expect(deleteTask({ id: 0 })).rejects.toEqual({
//     error: "Task not found.",
//   });
// });

// it("grgg.",  () => {
//   expect.assertions(1);

//  return  deleteTask({ id: 5 }).catch((e) => {
//     console.log("tgtg");
//     expect(e).toEqual("error");
//   });
// });
