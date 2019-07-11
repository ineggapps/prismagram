import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";
import schema from "./schema";
import { sendSecretMail } from "./utils";
// import { prisma } from "../generated/prisma-client";

sendSecretMail("inegg.apps@gmail.com", "hello world");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema /*,context: { prisma }*/,
  context: ({ request }) => {
    return { request };
  }
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✔ Server running on port http://localhost:${PORT}`)
);
