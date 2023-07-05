import jwt from "jsonwebtoken";

export const verifyUserToken = (token: string, key: string) => {
  try {
    key = process.env.ACCESS_TOKEN_USER_KEY!;
    const verifyToken = jwt.verify(token, key);
    return Promise.resolve(verifyToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
