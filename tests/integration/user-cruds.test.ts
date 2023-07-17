import request from "supertest";
import app from "../../src/app";

import connection from "../config/test-database";

// you need to be running the back-end for this test to work
// because it tests the database (run "docker-compose up")

const fakeUser = {
  name: "Maike Menezes",
  email: "maike@gmail.com",
  password: "123456",
  games: ["Minecraft", "Football Manager 2023"],
};

describe("User CRUDS", () => {
  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => connection.clear());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it("should create a new user", async () => {
    const response = await request(app).post("/users").send(fakeUser);

    expect(response.status).toBe(201);
  });

  it("should return all users", async () => {
    await request(app).post("/users").send(fakeUser);

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("should update a user", async () => {
    const response = await request(app).post("/users").send(fakeUser);

    const { id } = response.body;

    const updatedUser = {
      email: "mm@gmail.com",
    };

    const updatedResponse = await request(app)
      .patch(`/users/${id}`)
      .send(updatedUser);

    expect(updatedResponse.status).toBe(200);
  });

  it("should delete a user", async () => {
    const response = await request(app).post("/users").send(fakeUser);

    const { id } = response.body;

    const deletedResponse = await request(app).delete(`/users/${id}`);

    expect(deletedResponse.status).toBe(200);
  });
});
