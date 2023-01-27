import { useQuery } from "react-query";

function getActiveProjects() {
  return useQuery("activeProjects", async () => {
    try{
      const res = await fetch("/api/get-active-projects");
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
  })
}

function getProjectById(id) {
  return useQuery("projectById", async () => {
    try{
      const res = await fetch(`/api/get-project-by-id/${id}`);
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
  })
}

export { getActiveProjects, getProjectById };