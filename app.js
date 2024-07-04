const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");

const syncModels = require("./db/sync");
const restourantAuth = require("./db/restourant_api/schema");
const Resolver = require("./db/restourant_api/resolver");
const app = express();
// syncModels();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: restourantAuth,
    rootValue: Resolver,
    graphiql: true,
  })
);

app.listen(8000, () => {
  console.log("listening");
});
