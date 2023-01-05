import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`;

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

export { DELETE_PROJECT, UPDATE_PROJECT, ADD_PROJECT };
