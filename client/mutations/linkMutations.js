import { gql } from "@apollo/client";

const DELETE_LINK = gql`
  mutation deleteLink($id: ID!) {
    deleteLink(id: $id) {
      id
      name
      url
    }
  }
`;

const ADD_LINK = gql`
  mutation addLink(
    $name: String!
    $url: String!
    $active: Boolean!
    $project: ID!
  ) {
    addLink(name: $name, url: $url, active: $active, project: $project) {
      id
      name
      url
      active
      project
    }
  }
`;

const UPDATE_LINK = gql`
  mutation updateLink(
    $id: ID!
    $name: String
    $url: String
    $active: Boolean
    $project: ID
  ) {
    updateLink(
      id: $id
      name: $name
      url: $url
      active: $active
      project: $project
    ) {
      id
      name
      url
      active
      project
    }
  }
`;

export { DELETE_LINK, UPDATE_LINK, ADD_LINK };
