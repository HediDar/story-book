import axios from "axios";

export function getAllTasks() {
  return axios.get("https://my-front-end-to-do.herokuapp.com/api/tasks");
}

export function addTask(task) {
  return axios.post("https://my-front-end-to-do.herokuapp.com/api/tasks", {
    name: task.name,
    description: task.description,
    important: task.important,
    done: task.done,
  });
}

export function deleteTask({id}) {
  return axios.delete("https://my-front-end-to-do.herokuapp.com/api/tasks?_id=" + id);
}

export function updateTask(task) {
  return axios.put("https://my-front-end-to-do.herokuapp.com/api/tasks?_id=" + task._id, {
    name: task.name,
    description: task.description,
    important: task.important,
    done: task.done,
  });
}
