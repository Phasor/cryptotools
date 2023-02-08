import { useQuery } from "react-query";
import axios from "axios";

function getActiveProjects() {
  return axios
    .get("/api/get-active-projects")
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        return Promise.reject(err.response.data);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    });
}

function getAllProjects() {
  return axios
    .get("/api/get-all-projects")
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        return Promise.reject(err.response.data);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    });
}

function getProjectById(id){
  return axios
    .get(`/api/get-project-by-id?id=${id}`)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        return Promise.reject(err.response.data);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    })
}

function getProjectByName(name){
  console.log("name in function ", name)
  return axios
    .get(`/api/get-project-by-name?name=${name}`)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        return Promise.reject(err.response.data);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    })
}




function editProject({formData, id}) {
  return axios
    .post("/api/edit-project-by-id", 
      {formData, id},
      {
        headers : {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token"),
        }
      })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        return Promise.reject(err.response.data);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    });
} 



export { getActiveProjects, getAllProjects, getProjectById, editProject, getProjectByName };