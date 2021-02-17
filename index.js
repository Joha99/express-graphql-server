const express = require("express");
const app = express();
const PORT = process.env.PORT || 6969;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");

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
