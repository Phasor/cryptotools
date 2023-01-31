import { gql } from "@apollo/client";
import { useMutation, useQuery } from 'react-query'
import { useQueryClient } from 'react-query';


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
