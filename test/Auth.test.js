/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

describe("Test Authentication usecases", () => {
  beforeAll(done => {
    done();
  });

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });

  // Register test cases
  describe("when name, email and password is missing", () => {
    // should respond with status code of 422
    test("should respond with a status code of 422", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          email: "",
          password: "",
          name: ""
        });
      expect(response.statusCode).toBe(422);
    });
  });

  describe("Given already used email", () => {
    // should respond with status code of 400
    test("should respond with a status code of 400", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          email: "test@test.com",
          password: "123456",
          name: "Test user"
        });
      expect(response.statusCode).toBe(400);
    });
  });

  //   describe("Given correct parameters", () => {
  //     // should respond with status code of 201
  //     test("should respond with a status code of 201", async () => {
  //       const response = await request(app)
  //         .post("/api/auth/register")
  //         .send({
  //           email: "test10@test.com",
  //           password: "123456",
  //           name: "Test Ten"
  //         });
  //       expect(response.statusCode).toBe(201);
  //     });
  //   });

  // Login test cases
  describe("when email and password is missing", () => {
    // should respond with status code of 422
    test("should respond with a status code of 422", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "",
          password: ""
        });
      expect(response.statusCode).toBe(422);
    });
  });

  describe("Given wrong email and password", () => {
    // should respond with status code of 400
    test("should respond with a status code of 400", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test4@test.com",
          password: "12345678"
        });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("Given correct email and password", () => {
    // should respond with status code of 200
    test("should respond with a status code of 200", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test4@test.com",
          password: "12345"
        });
      expect(response.statusCode).toBe(200);
    });
  });

  // Get user test case
  describe("Given wrong authorization header or no authoraization header", () => {
    // should respond with status code of 401
    test("should respond with a status code of 401", async () => {
      const response = await request(app).get("/api/auth/me");
      expect(response.statusCode).toBe(401);
    });
  });
  describe("Given authorization header", () => {
    // should respond with status code of 200
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwM2JlOWQ1YjU4NWI0M2ZlZjM3YTEwIn0sImlhdCI6MTY3ODA5NTQzOCwiZXhwIjoxNjc4MTMxNDM4fQ.clKgj8WHYT_Lepf1EeWYmCg6trkTzvsNIALYyV9rt6I";
    test("should respond with a status code of 200", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
    });
  });
});
