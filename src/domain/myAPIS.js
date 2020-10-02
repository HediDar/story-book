import axios from "axios";

export function getAllTasks() {
  return axios.get("http://localhost:8000/api/tasks");
}

export function addTask(task) {
  return axios.post("http://localhost:8000/api/tasks", {
    name: task.name,
    description: task.description,
    important: task.important,
    done: task.done,
  });
}

export function deleteTask(id) {
  return axios.delete("http://localhost:8000/api/tasks?_id=" + id);
}

export function updateTask(task) {
  return axios.put("http://localhost:8000/api/tasks?_id=" + task._id, {
    name: task.name,
    description: task.description,
    important: task.important,
    done: task.done,
  });
}
