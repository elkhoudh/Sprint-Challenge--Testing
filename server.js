const express = require("express");

const server = express();

server.use(express.json());

let data = [];

server.get("/", (req, res) => {
  res.json("it works!");
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ message: "All feild required" });
  } else {
    data.push({ title, genre, releaseYear });
    res.status(201).json(data);
  }
});

server.get("/games", (req, res) => {
  res.json(data);
});

module.exports = server;
