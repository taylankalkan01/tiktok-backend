import request from "supertest";
import app from "../../src/app";
import mongoose, { ConnectOptions } from "mongoose";
import User from "../../src/models/User";
import { z } from "zod";

const baseRoute = "/api/auth";

jest.setTimeout(30000);

beforeAll(() => {
  const url = process.env.MONGO_TEST_URL || "";
  mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

// Cleans up database between each test
afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

console.log("Test Database Connected Successfully.", mongoose.connection.host);

describe("User Register api", () => {
  const successData = {
    username: "taylankalkan1",
    fullName: "taylan kalkan1",
    bio: "bio example1",
    phoneNumber: "5380388632",
    email: "taylan1@gmail.com",
    password: "taylan1",
  };

  const emailErrorData = {
    username: "taylankalkan1",
    fullName: "taylan kalkan1",
    bio: "bio example1",
    phoneNumber: "5380388632",
    email: "taylan1@gmail.com",
    password: "taylan1",
  };

  const catchData = {
    username: "taylankalkan1",
    fullName: "taylan kalkan1",
    bio: "bio example1",
    phoneNumber: "5380388632",
    email: "taylan1@gmail.com",
    password: "taylan1",
  };

  const validationErrorData = {
    username: "ta",
  };

  //SUCCESS:

  it("should return status 201 if user is registered succesfully", async () => {
    const res = await request(app).post(`${baseRoute}/register`).send(successData);
    expect(res.status).toBe(201);
  });

  it("should return json error:false", async () => {
    const res = await request(app).post(`${baseRoute}/register`).send(successData);
    expect(res.body.error).toBe(false);
  });

  it("should return json message:User is registered!", async () => {
    const res = await request(app).post(`${baseRoute}/register`).send(successData);
    expect(res.body.message).toBe("User is registered!");
  });

  it("should return json data object:successData (except password)", async () => {
    const res = await request(app).post(`${baseRoute}/register`).send(successData);
    expect(res.body.data.username).toBe(successData.username);
    expect(res.body.data.bio).toBe(successData.bio);
    expect(res.body.data.email).toBe(successData.email);
    expect(res.body.data.fullName).toBe(successData.fullName);
    expect(res.body.data.phoneNumber).toBe(successData.phoneNumber);
  });

  //ERRORS:

  it("should return status 400 if email is exist", async () => {
    // Create a user with the existing email in the database
    const existingUser = new User({
      username: "taylankalkan1",
      fullName: "taylan kalkan1",
      bio: "bio example1",
      phoneNumber: "5380388632",
      email: emailErrorData.email, // Set the existing email
      password: "taylan1",
    });

    await existingUser.save();

    const res = await request(app).post(`${baseRoute}/register`).send(emailErrorData);
    expect(res.status).toBe(400);
  });

  it("should return json error:true", async () => {
    // Create a user with the existing email in the database
    const existingUser = new User({
      username: "taylankalkan1",
      fullName: "taylan kalkan1",
      bio: "bio example1",
      phoneNumber: "5380388632",
      email: emailErrorData.email, // Set the existing email
      password: "taylan1",
    });

    await existingUser.save();

    const res = await request(app).post(`${baseRoute}/register`).send(emailErrorData);
    expect(res.body.error).toBe(true);
  });

  it("should return json message:You cannot register, Email already exist", async () => {
    // Create a user with the existing email in the database
    const existingUser = new User({
      username: "taylankalkan1",
      fullName: "taylan kalkan1",
      bio: "bio example1",
      phoneNumber: "5380388632",
      email: emailErrorData.email, // Set the existing email
      password: "taylan1",
    });

    await existingUser.save();

    const res = await request(app).post(`${baseRoute}/register`).send(emailErrorData);
    expect(res.body.message).toBe("You cannot register, Email already exist");
  });

  it("should return status 400 if username is exist", async () => {
    // Create a user with the existing username in the database
    const existingUser = new User({
      username: emailErrorData.username, // Set the existing username
      fullName: "taylan kalkan1",
      bio: "bio example1",
      phoneNumber: "5380388632",
      email: "taylan@gmail.com",
      password: "taylan1",
    });

    await existingUser.save();

    const res = await request(app).post(`${baseRoute}/register`).send(emailErrorData);
    expect(res.status).toBe(400);
  });

  it("should return json error:true", async () => {
    // Create a user with the existing username in the database
    const existingUser = new User({
      username: emailErrorData.username, // Set the existing username
      fullName: "taylan kalkan1",
      bio: "bio example1",
      phoneNumber: "5380388632",
      email: "taylan@gmail.com",
      password: "taylan1",
    });

    await existingUser.save();

    const res = await request(app).post(`${baseRoute}/register`).send(emailErrorData);
    expect(res.body.error).toBe(true);
  });

  it("should return json message:You cannot register, Username already exist", async () => {
    // Create a user with the existing username in the database
    const existingUser = new User({
      username: emailErrorData.username, // Set the existing username
      fullName: "taylan kalkan1",
      bio: "bio example1",
      phoneNumber: "5380388632",
      email: "taylan@gmail.com",
      password: "taylan1",
    });

    await existingUser.save();

    const res = await request(app).post(`${baseRoute}/register`).send(emailErrorData);
    expect(res.body.message).toBe("You cannot register, Username already exist");
  });

  //GENERAL CATCH ERROR:

  it("should return status 500 if an error occurs", async () => {
    // Mock the User.findOne function to throw an error
    jest.spyOn(User, "findOne").mockImplementation(() => {
      throw new Error("Mocked error");
    });

    const res = await request(app).post(`${baseRoute}/register`).send(catchData);

    // Assert the response status code
    expect(res.status).toBe(500);
  });

  it("should return json error:true and message:{error} if an error occurs", async () => {
    // Mock the User.findOne function to throw an error
    jest.spyOn(User, "findOne").mockImplementation(() => {
      throw new Error("Mocked error");
    });

    const res = await request(app).post(`${baseRoute}/register`).send(catchData);

    // Assert the response status code
    expect(res.body).toMatchObject({
      error: true,
      message: expect.any(Object),
    });
  });

  // INSTANCE OF ZOD CATCH ERROR

  it("should return status 422 if zod validation is not correct", async () => {
    const res = await request(app).post(`${baseRoute}/register`).send(validationErrorData);

    // Assert the response status code
    expect(res.status).toBe(422);
  });

  it("should return json error:true and message:Validation failed and data array object with formattedErrors", async () => {
    jest.mock("zod", () => {
      const originalModule = jest.requireActual("zod");
      const mockedError = new originalModule.ZodError([]);
      return {
        ...originalModule,
        ZodError: jest.fn().mockReturnValue(mockedError),
      };
    });

    const res = await request(app).post(`${baseRoute}/register`).send(validationErrorData);

    // Assert the response body
    expect(res.body).toEqual({
      error: true,
      message: "Validation failed",
      data: expect.any(Array),
    });
  });
});
