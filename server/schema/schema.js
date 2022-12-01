const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");

const LinkType = new GraphQLObjectType({
  name: "Link",
  fields: () => ({
    id: { type: GraphQLID },
    URL: { type: GraphQLString },
    Name: { type: GraphQLString },
    active: { type: GraphQLBoolean },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    website: { type: GraphQLString },
    active: { type: GraphQLBoolean },
  }),
});
