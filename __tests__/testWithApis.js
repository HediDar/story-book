import axios from "axios";
import "regenerator-runtime/runtime";
import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../src/domain/myAPIS";

jest.mock("axios");
const apiUrl = "https://my-front-end-to-do.herokuapp.com/api/tasks";


describe("getAllTasks", () => {
  it("fetches successfully all tasks data from an API", async () => {
    const data = {
      data: {
        tasks: [
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
        ],
      },
    };

    axios.get.mockResolvedValue(data);
    await expect(getAllTasks()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(apiUrl);
  });

  it("fetches erroneously tasks from my API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getAllTasks()).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(apiUrl);
  });
});

describe("addTask", () => {
  it("adds successfully a task data with an API", async () => {
    const data = {
      name: "important task",
      description: "",
      important: true,
      done: true,
    };
    axios.post.mockResolvedValue(data);
    await expect(addTask(data)).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(apiUrl, data);
  });

  it("adds erroneously a task with my API", async () => {
    const errorMessage = "Network Error";
    const data = {
      name: "important task",
      description: "",
      important: true,
      done: true,
    };
    axios.post.mockRejectedValue(new Error(errorMessage));

    await expect(addTask(data)).rejects.toThrow(errorMessage);
    expect(axios.post).toHaveBeenCalledWith(apiUrl, data);
  });
});

describe("deleteTask", () => {
  it("delete successfully a task with id with an API", async () => {
    const id = "5f7c61ef72e7de0017f59ce6";

    axios.delete.mockResolvedValue(id);
    await expect(deleteTask({ id })).resolves.toEqual(id);
    expect(axios.delete).toHaveBeenCalledWith(apiUrl + "?_id=" + id);
  });

  it("deletes erroneously a task with id with my API", async () => {
    const errorMessage = "Network Error";
    const id = "5f7c61ef72e7de0017f59ce6";

    axios.delete.mockRejectedValue(new Error(errorMessage));
    await expect(deleteTask({ id })).rejects.toThrow(errorMessage);
    expect(axios.delete).toHaveBeenCalledWith(apiUrl + "?_id=" + id);


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
