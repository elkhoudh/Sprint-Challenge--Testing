const express = require("express");

const server = express();

server.use(express.json());

let init = 1;

const increment = () => {
  return (init += 1);
};

let data = [];

server.get("/", (req, res) => {
  res.json("it works!");
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ message: "All feild required" });
  } else {
    const dupeTitle = data.find(game => game.title === title);

    if (dupeTitle) {
      res.status(405).json({ message: "Action not allowed" });
    } else {
      data.push({ id: increment(), title, genre, releaseYear });
      res.status(201).json(data);
    }
    // dupeTitle && dupeTitle.title === title
    //   ? res.status(405).json({ message: "Action not allowed" })
    //   : data.push({ id: increment(), title, genre, releaseYear });
    // res.status(201).json(data);
  }
});

server.get("/games", (req, res) => {
  res.json(data);
});

module.exports = server;
