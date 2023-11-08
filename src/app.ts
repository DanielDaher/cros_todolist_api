import express from "express";
import cors from "cors";
import usersRoute from "./Routes/usersRoute";
import tasksRoute from "./Routes/tasksRoute";
import loginRoute from "./Routes/loginRoute";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const app = express();

app.use(
  express.json({
    type: ["application/json", "text/plain"]
  })
); //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request

app.use(cors());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/tasks", tasksRoute.router);
app.use("/login", loginRoute.router);
app.use("/users", usersRoute.router);

export default app;
