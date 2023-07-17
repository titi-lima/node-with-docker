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
});
