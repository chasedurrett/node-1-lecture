const express = require("express"); // imports express
const app = express(); // assigns express to app, the gateway to our server
const ctrl = require("./controller");
const SERVER_PORT = 4000; // never start a port lower than 3000, and 3000 is reserved for a development server

app.use(express.json()); // parses json to js

app.get("/api/chase", (req, res) => {
  res.status(200).send("chase");
});

app.get("/api/users", ctrl.getAllUsers); // retrieves getAllUsers fn from ctrl (controller)
app.get("/api/users/:user_id", ctrl.getUserById);

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT}`)
);
