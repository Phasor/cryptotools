import React from "react";
import { gql } from "@apollo/client";

const GET_LINK = gql`
  query getLink($id: ID!) {
    link(id: $id) {
      id
      name
      url
      active
      project
    }
  }
`;

export { GET_LINK };
