import express, { Express } from "express";
import request from "supertest";
import UserController from "../controllers/UserController";

// Module under test

describe("server.routes.version", function () {
  let app: Express;

  beforeEach(function (done) {
    app = express();
    app.use("/register", new UserController().register);
    done();
  });

  it("Gives required validation errors", function (done) {
    const body = {};

    request(app)
      .post("/register")
      .set({ body })
      .expect("Content-Type", /json/)
      .expect(200, [])
      .end(function (err, res) {
        if (err) throw err;
        console.log(res);
        done();
      });
  });
});
