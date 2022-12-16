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

export { DELETE_LINK };
