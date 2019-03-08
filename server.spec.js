const request = require("supertest");

const server = require("./server");

describe("POST /games", () => {
  it("should take an object", () =>
    request(server)
      .post("/games")
      .send({
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      })
      .then(res => expect(res.status).toBe(201)));

  it("should return 422 when data is incomplete", () =>
    request(server)
      .post("/games")
      .send({
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      })
      .then(res => expect(res.status).toBe(422)));

  it("validate title is unique", () => {
    return request(server)
      .post("/games")
      .send({
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      })
      .then(res => expect(res.status).toBe(405));
  });
});

describe("GET /games", () => {
  it("should return all games and status of 200", () =>
    request(server)
      .get("/games")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
      }));
});

describe("DELETE /games/:id", () => {
  it("should delete game", () => {
    return request(server)
      .delete("/games/1")
      .then(res => expect(res.status).toBe(200));
  });
});

describe("GET /games/:id", () => {
  it("should return 404 if game not found", () => {
    return request(server)
      .get("/games/1000")
      .then(res => expect(res.status).toBe(404));
  });
});
