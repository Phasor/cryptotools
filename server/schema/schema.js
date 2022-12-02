const Project = require("../models/Project");
const Link = require("../models/Link");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

const LinkType = new GraphQLObjectType({
  name: "Link",
  fields: () => ({
    id: { type: GraphQLID },
    url: { type: GraphQLString },
    name: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    project: { type: GraphQLID },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    website: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    links: { type: new GraphQLList(LinkType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({}).populate("links");
      },
    },
    links: {
      type: new GraphQLList(LinkType),
      resolve(parent, args) {
        return Link.find({});
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add a Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        active: { type: GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          website: args.website,
          active: args.active,
        });
        return project.save();
      },
    },
    // add a Link
    addLink: {
      type: LinkType,
      args: {
        url: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        active: { type: GraphQLNonNull(GraphQLBoolean) },
        project: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // save new link
        const link = new Link({
          url: args.url,
          name: args.name,
          active: args.active,
          project: args.project,
        });

        // add link to project
        Project.findById(args.project).then((project) => {
          project.links.push(link);
          project.save();
        });

        return link.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
