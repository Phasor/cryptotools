import React from "react";
import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
      website
      symbol
      image
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

const GET_ACTIVE_PROJECTS = gql`
  query {
    activeProjects {
      id
      name
      website
      symbol
      image
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

// get project by ID
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      symbol
      website
      image
      active
      links {
        id
        name
        url
        active
        project
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT, GET_ACTIVE_PROJECTS };
