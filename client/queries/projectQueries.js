import { useQuery } from "react-query";
import axios from "axios";

function useProjects() {
  return useQuery(["activeProjects"], async () => {
    try{
      const res = await fetch("/api/get-active-projects");
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
  })
}

function useAllProjects() {
  return useQuery(["allProjects"], async () => {
    try{
      const res = await fetch("/api/get-all-projects");
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
  })
}

function getProjectById(id) {
  // the id parameter runs the function when the id changes
  return useQuery(["projectById", id], async () => {
    try{
      const res = await fetch(`/api/get-project-by-id?id=${id}`);
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
  },  
  {
    // this will prevent the query from running if there is no id
    enabled: id !== undefined,
  })
}

// const editProject = async (formData) => {
//   if(localStorage.getItem("token")){
//     try{
//       const token = localStorage.getItem("token");
//       const response = await fetch('/api/edit-project-by-id', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       return data;
//     } catch(err){
//       console.log(err);
//     }
//   } else {
//     console.log("No token found");
//   }
// }

function editProject({formData, id}) {
  // console.log("formData", formData);
  // console.log("id", id);
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



export { useProjects, getProjectById, useAllProjects, editProject };