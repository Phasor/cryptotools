import React from "react";
import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
      website
      active
      links {
        id
        url
        name
        active
        project
      }
    }
  }
`;

export { GET_PROJECTS };
