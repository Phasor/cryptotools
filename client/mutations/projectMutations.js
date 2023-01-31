import { gql } from "@apollo/client";
import { useMutation, useQuery } from 'react-query'
import { useAllProjects } from "../queries/projectQueries";

const deleteProject = async (id) => {
  if(localStorage.getItem("token")){
    try{
      const token = localStorage.getItem("token");
      const response = await fetch('/api/delete-project-by-id', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      return data;
    } catch(err){
      console.log(err);
    }
  } else {
    console.log("No token found");
  }
}

function useDeleteProjectById() {
  const { mutate } = useMutation(deleteProject, {
    onSuccess: () => {
      // refetch the projects query after a successful mutation
      client.invalidateQueries('allProjects');
    }});
  return mutate;
}





const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $symbol: String
    $image: String!
    $website: String
    $active: Boolean!
  ) {
    addProject(
      name: $name
      symbol: $symbol
      image: $image
      website: $website
      active: $active
    ) {
      id
      name
      symbol
      image
      website
      active
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String
    $symbol: String
    $image: String
    $website: String
    $active: Boolean
  ) {
    updateProject(
      id: $id
      name: $name
      symbol: $symbol
      image: $image
      website: $website
      active: $active
    ) {
      id
      name
      symbol
      image
      website
      active
    }
  }
`;

export { useDeleteProjectById, UPDATE_PROJECT, ADD_PROJECT };
