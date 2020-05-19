const users = require("../data.json"); // brings in .json data

let id = users[users.length - 1].id + 1;

module.exports = {
  getAllUsers: (req, res) => {
    const { email } = req.query;
    if (email) {
      const filteredUsers = users.filter((element) =>
        element.email.includes(email)
      );
      res.status(200).send(filteredUsers);
    } else {
      res.status(200).send(users);
    }
    res.status(200).send(users);
  },

  getUserById: (req, res) => {
    // req.params.user_id; de-structured below, more common
    const { user_id } = req.params;
    const user = users.find((element) => element.id === +user_id);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  },

  createUser: (req, res) => {
    const { first_name, last_name, email } = req.body;

    const newUser = { id, first_name, last_name, email };

    users.push(newUser);

    id++;

    res.status(200).send(users);
  },

  editUser: (req, res) => {
    const { user_id } = req.params;
    const { first_name, last_name, email } = req.body;
    const index = users.findIndex((element) => element.id === +user_id);

    if (index === -1) {
      return res.status(404).send("User not found");
    }
    const updatedUser = {
      id: +user_id,
      first_name: first_name || users[index].first_name,
      last_name: last_name || users[index].last_name,
      email: email || users[index].email,
    };

    users[index] = updatedUser;

    res.status(200).send(users);
  },

  deleteUser: (req, res) => {
    const { user_id } = req.params;
    const index = users.findIndex((element) => element.id === +user_id);

    if (index === -1) {
      return res.status(404).send("User not found");
    }

    users.splice(index, 1);

    res.status(200).send(users);
  },
};

// .find scans over the array to find the first matching user_id that--
// is entered and then returns it
