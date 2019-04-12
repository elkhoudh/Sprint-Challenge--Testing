const express = require("express");

const server = express();

server.use(express.json());

let init = 1;

const increment = () => {
  return (init += 1);
};

let data = [
  {
    id: 1,
    title: "TESTING",
    genre: "TEST",
    releaseYear: 1993
  }
];

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
  }
});

server.get("/games", (req, res) => {
  res.json(data);
});

server.get("/games/:id", (req, res) => {
  const { id } = req.params;

  const game = data.find(games => games.id == id);
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;

  const game = data.filter(game => game.id != id);

  res.json(game);
});

module.exports = server;
