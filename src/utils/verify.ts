import { Request } from "express";
import jwt_decode from "jwt-decode";

type Response = {
  userId: number;
  username: string;
};

export function verify(req: Request): Response | null {
  let token;
  let response: Response;

  if (!req.headers.authentication) {
    return null;
  }

  if (req.headers.authentication) {
    token = req.headers.authentication.toString().split("Bearer ")[1];
  } else if (req.headers.Authentication) {
    token = req.headers.Authentication.toString().split("Bearer ")[1];
  }

  if (token) {
    try {
      response = jwt_decode(token);
      return response;
    } catch (error) {
      return null;
    }
  }

  return null;
}
