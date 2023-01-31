import { useQuery } from "react-query";

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

export { useProjects, getProjectById, useAllProjects };