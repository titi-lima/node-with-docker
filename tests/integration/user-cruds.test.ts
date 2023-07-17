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

  it("should not create a new user with an email that is already in use", async () => {
    await request(app).post("/users").send(fakeUser);
    const response = await request(app).post("/users").send(fakeUser);
    expect(response.status).toBe(409);
  });

  it("should not create a new user with an invalid email", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        ...fakeUser,
        email: "maike",
      });
    expect(response.status).toBe(400);
  });

  it("should not create a new user with an invalid password", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        ...fakeUser,
        password: "123",
      });
    expect(response.status).toBe(400);
  });
});
