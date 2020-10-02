import axios from "axios";

export function getAllTasks() {
  return axios.get("http://localhost:8000/api/tasks");
}


export function addTask({task}) {

	return axios.post('http://localhost:8000/api/tasks', {task});
	
  }


export function deleteTask(){


}

export function updateTask(){

	
}


