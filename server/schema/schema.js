// GraphQL Schema
const Project = require("../models/Project");
const Link = require("../models/Link");
const utils = require("../lib/utils");

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
    symbol: { type: GraphQLString },
    image: { type: GraphQLString },
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
        return Project.find({}).populate("links").sort({ name: 1 });
      },
    },
    activeProjects: {
      type: new GraphQLList(ProjectType),
      // return all active projects
      resolve(parent, args) {
        return Project.find({ active: true })
          .populate("links")
          .sort({ name: 1 });
      },
    },

    links: {
      type: new GraphQLList(LinkType),
      resolve(parent, args) {
        return Link.find({});
      },
    },
    link: {
      type: LinkType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Link.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id).populate("links");
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
        symbol: { type: GraphQLString },
        image: { type: GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        active: { type: GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, args, request) {
        if (request.headers.authorization === undefined)
          return new Error("Please provide a JWT in the Authorization header");
        // check if JWT is valid
        // get JWT from request
        const token = request.headers.authorization.split(" ")[1];
        // verify JWT
        return utils
          .verifyJWT(token)
          .then((decoded) => {
            const project = new Project({
              name: args.name,
              symbol: args.symbol,
              image: args.image,
              website: args.website,
              active: args.active,
            });
            return project.save();
          })
          .catch((error) => error);
      },
    },

    // delete a Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, request) {
        if (request.headers.authorization === undefined)
          return new Error("Please provide a JWT in the Authorization header");
        // get JWT from request
        const token = request.headers.authorization.split(" ")[1];
        // verify JWT
        return utils
          .verifyJWT(token)
          .then(() => Link.deleteMany({ project: args.id }))
          .then(() => Project.findByIdAndDelete(args.id))
          .catch((error) => error);
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
      resolve(parent, args, request) {
        // get JWT from request
        if (request.headers.authorization === undefined)
          return new Error("Please provide a JWT in the Authorization header");
        const token = request.headers.authorization.split(" ")[1];
        // verify JWT
        return utils
          .verifyJWT(token)
          .then(() => {
            // save link
            const link = new Link({
              url: args.url,
              name: args.name,
              active: args.active,
              project: args.project,
            });
            return link.save();
          })
          .then((link) => {
            return Project.findById(args.project).then((project) => {
              project.links.push(link);
              project.save();
              return link;
            });
          })
          .catch((error) => error);
      },
    },

    // delete a Link
    deleteLink: {
      type: LinkType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, request) {
        if (request.headers.authorization === undefined)
          return new Error("Please provide a JWT in the Authorization header");
        // get JWT from request
        const token = request.headers.authorization.split(" ")[1];
        // verify JWT
        return utils
          .verifyJWT(token)
          .then(() => Link.findByIdAndDelete(args.id))
          .catch((error) => error);
      },
    },

    // update a Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        symbol: { type: GraphQLString },
        image: { type: GraphQLString },
        name: { type: GraphQLString },
        website: { type: GraphQLString },
        active: { type: GraphQLBoolean },
      },
      resolve(parent, args, request) {
        if (request.headers.authorization === undefined)
          return new Error("Please provide a JWT in the Authorization header");
        // get JWT from request
        const token = request.headers.authorization.split(" ")[1];
        // verify JWT
        return utils
          .verifyJWT(token)
          .then(() => {
            return Project.findByIdAndUpdate(
              args.id,
              {
                symbol: args.symbol,
                image: args.image,
                name: args.name,
                website: args.website,
                active: args.active,
              },
              { new: true }
            );
          })
          .catch((error) => error);
      },
    },

    // update a Link
    updateLink: {
      type: LinkType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        url: { type: GraphQLString },
        name: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        project: { type: GraphQLID },
      },
      resolve(parent, args, request) {
        if (request.headers.authorization === undefined)
          return new Error("Please provide a JWT in the Authorization header");
        // get JWT from request
        const token = request.headers.authorization.split(" ")[1];
        // verify JWT
        return utils.verifyJWT(token).then(() => {
          return Link.findByIdAndUpdate(
            args.id,
            {
              url: args.url,
              name: args.name,
              active: args.active,
              project: args.project,
            },
            { new: true }
          );
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
