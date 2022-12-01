const Project = require("../models/Project");
const Link = require("../models/Link");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
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
    links: {
      type: new GraphQLList(LinkType),
      resolve(parent, args) {
        return Link.find({ project: parent.id });
      },
    },
  }),
});
