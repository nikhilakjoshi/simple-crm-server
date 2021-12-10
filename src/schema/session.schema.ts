import { boolean, object, string, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({
    userId: string({
      required_error: "userId is required",
    }),
    isSessionValid: boolean({
      required_error: "isSessionValid is required",
    }),
  }),
});

export const validatePasswordSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Email is invalid"),
    password: string({
      required_error: "password is required",
    }),
  }),
});
