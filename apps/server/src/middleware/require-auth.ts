import { auth } from "@kuskas-app/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }

  req.user = {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
  };

  next();
}
