import request from "supertest";
import app from "../src/app";

describe("app healthcheck", () => {
  it("should return status code 200", async () => {
    const res = await request(app).get("/healthcheck");
    expect(res.status).toBe(200);
  });
  it("should return healthcheck message", async () => {
    const res = await request(app).get("/healthcheck");
    expect(res.body.message).toBe("healthcheck");
  });
  it("should return json error:false ", async () => {
    const res = await request(app).get("/healthcheck");
    expect(res.body.error).toBe(false);
  });
});
