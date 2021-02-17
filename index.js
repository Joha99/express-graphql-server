const express = require("express");
const app = express();
const PORT = process.env.PORT || 6969;
const userData = require("./MOCK_DATA.json");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

// User typedef
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

// Getting data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // fetch some data
        return userData;
      },
    },
  },
});

// Mutating data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
  },
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// create graphql server
// single endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // visualize queries
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
