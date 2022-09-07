import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("list user", () => {
  beforeEach(async () => {
    await truncate();

    jest.setTimeout(30000);
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userlisting@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .put("/api/users/edit")
      .send({
        email: "userlisting@mail.com.br",
        password: "123123123",
        name: "user name name",
        bornAt: "02/09/2001",
      });

    expect(response.status).toEqual(500);
  });

  it("should return an exception if wrong data is send", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userlistingwrong@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userlistingwrong@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .put("/api/users/edit")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        email: "a@mail.br",
      });

    expect(response.status).toEqual(400);
  });
});
