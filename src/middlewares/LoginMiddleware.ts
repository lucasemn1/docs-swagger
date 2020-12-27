import { NextFunction, Request, Response } from "express";
import admin from "../services/firebaseAdmin";

export default class LoginMiddleware {
  static async verifyLogin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { authorization } = request.headers;

    if (!authorization)
      return response.status(401).send({ message: "Unauthorized" });

    if (!authorization.startsWith("Bearer"))
      return response.status(401).send({ message: "Unauthorized" });

    const split = authorization.split("Bearer ");
    if (split.length !== 2)
      return response.status(401).send({ message: "Unauthorized" });

    const token = split[1];

    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(token);
        
      response.locals = {
        ...response.locals,
        uid: decodedToken.uid,
        role: decodedToken.role,
        email: decodedToken.email,
      };
      
      return next();
    } catch (err) {
      console.error(`${err.code} -  ${err.message}`);
      return response.status(401).send({ message: "Unauthorized" });
    }
  }
}
