/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwM2JlOWQ1YjU4NWI0M2ZlZjM3YTEwIn0sImlhdCI6MTY3ODA5NTQzOCwiZXhwIjoxNjc4MTMxNDM4fQ.clKgj8WHYT_Lepf1EeWYmCg6trkTzvsNIALYyV9rt6I";

describe("Test Product CRUD usecases", () => {
  beforeAll(done => {
    done();
  });

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });

  // Read Product
  describe("Fetch all product", () => {
    test("should respond with a status code of 200", async () => {
      const response = await request(app)
        .get("/api/product")
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
    });
  });

  // fetch single Product
  describe("Fetch Single product by id", () => {
    test("should respond with a status code of 200", async () => {
      const response = await request(app)
        .get("/api/product/6405b7e69e2c8f58af2da2ff")
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
    });
  });

  // fetch single Product
  describe("Given wrong product id ", () => {
    test("should respond with a status code of 400", async () => {
      const response = await request(app)
        .get("/api/product/6403d195deecf1eefbc90cb2")
        .set("Authorization", token);
      expect(response.statusCode).toBe(400);
    });
  });

  // Delete a product
  describe("Delete a product given product id ", () => {
    test("should respond with a status code of 200", async () => {
      const response = await request(app)
        .delete("/api/product/delete/6403d195deecf1eefbc90cb6")
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
    });
  });

  // update a product
  describe("Update a product given product id ", () => {
    test("should respond with a status code of 200", async () => {
      const response = await request(app)
        .patch("/api/product/update/6405b7e69e2c8f58af2da2ff")
        .set("Authorization", token)
        .send({
          name: "Samsung note 10",
          price: 56990,
          quantity: 100
        });
      expect(response.statusCode).toBe(200);
    });
  });

  // create a product
  describe("Create a product given product data ", () => {
    test("should respond with a status code of 201", async () => {
      const response = await request(app)
        .post("/api/product/create")
        .set("Authorization", token)
        .field("name", "Samsung note 15")
        .field("price", 6000)
        .field("quantity", 10)
        .field("description", "product description")
        .attach(
          "productImage",
          path.resolve(__dirname, "../uploads/f2gXTM6image.png")
        );
      expect(response.statusCode).toBe(201);
    });
  });
});
