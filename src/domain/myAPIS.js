import axios from "axios";

export function getAllTasks() {
  return axios.get("http://localhost:8000/api/tasks");
}
