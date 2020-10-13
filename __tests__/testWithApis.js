import axios from "axios";
jest.mock("axios");
import "regenerator-runtime/runtime";
import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../src/domain/myAPIS";

describe("getAllTasks", () => {
  it("fetches successfully all tasks data from an API", async () => {
    const data = [
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
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(getAllTasks()).resolves.toEqual(data);
  });

  it("fetches erroneously tasks from my API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getAllTasks()).rejects.toThrow(errorMessage);
  });
});

describe("addTask", () => {
  it("adds successfully a task data with an API", async () => {
    const data = {
      _id: "5f7c61ef72e7de0017f59ce6",
      name: "important task",
      description: "",
      important: true,
      done: true,
    };

    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(addTask(data)).resolves.toEqual(data);
  });

  it("adds erroneously a task with my API", async () => {
    const errorMessage = "Network Error";
    const data = {
      _id: "5f7c61ef72e7de0017f59ce6",
      name: "important task",
      description: "",
      important: true,
      done: true,
    };
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(addTask(data)).rejects.toThrow(errorMessage);
  });
});

describe("deleteTask", () => {
  it("delete successfully a task with id with an API", async () => {
    const id = "5f7c61ef72e7de0017f59ce6";

    axios.delete.mockImplementationOnce(() => Promise.resolve(id));

    await expect(deleteTask({ id })).resolves.toEqual(id);
  });

  it("deletes erroneously a task with id with my API", async () => {
    const errorMessage = "Network Error";
    const id = "5f7c61ef72e7de0017f59ce6";
    axios.delete.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(deleteTask({ id })).rejects.toThrow(errorMessage);
  });
});

describe("updateTask", () => {
  it("update successfully a task with id with an API", async () => {
    const id = "5f7c61ef72e7de0017f59ce6";

    axios.put.mockImplementationOnce(() => Promise.resolve(id));

    await expect(updateTask({ id })).resolves.toEqual(id);
  });

  it("update erroneously a task with id with my API", async () => {
    const errorMessage = "Network Error";
    const id = "5f7c61ef72e7de0017f59ce6";
    axios.put.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(updateTask({ id })).rejects.toThrow(errorMessage);
  });
});
