import { object, string, TypeOf } from "zod";
export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "firstName is required",
    }),
    lastName: string({
      required_error: "lastName is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("Invalid email"),
    password: string({
      required_error: "password is required",
    }).min(6, "password cannot be less than 6 characters"),
    passwordConfirmation: string({
      required_error: "passwordConfimation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
