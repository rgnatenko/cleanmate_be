export const Errors = {
  InvalidJson: [400, "InvalidJson", "Invalid JSON"],
  ValidationError: (
    field: string,
    issue:
      | "range"
      | "type"
      | "too_small"
      | "too_large"
      | "restricted_characters"
  ) => [
    400,
    "ValidationError",
    `Parameter is missing or in an invalid format`,
    { field, issue },
  ],
  ActionLimit: (type: "rate") => [
    403,
    "ActionLimit",
    `You faced ${type} limit of this action`,
    { type },
  ],
  UnexpectedError: [
    500,
    "UnexpectedError",
    "Try again or contact support",
  ] as const,
  AlreadyExists: [400, "AlreadyExists", "This user already exists"] as const,
  RegistrationError: [
    400,
    "RegistrationError",
    "Wrong email or password, try to reregister with correct credentials",
  ] as const,
  Unauthorized: [401, "Unauthorized", "User is not authorized"] as const,
  IncorrectActivationLink: [
    400,
    "IncorrectActivationLink",
    "Incorrect activation link",
  ] as const,
  UserNotFound: [
    404,
    "UserNotFound",
    "User not found, try to re-login or register",
  ] as const,
  WrongPassword: [400, "WrongPassword", "Wrong password"] as const,
  IncorrectToken: [
    400,
    "IncorrectToken",
    "You must provide correct encrypted token",
  ] as const,
  FailedToGenerateToken: [
    400,
    "FailedToGenerateToken",
    "Failed to generate token, please try again",
  ] as const,
  EnterEmailOrUsername: [
    400,
    "EnterEmailOrUsername",
    "Enter email or username",
  ] as const,
  TimeSlotAlreadyBooked: [
    409,
    "TimeSlotAlreadyBooked",
    "Time slot already booked",
  ] as const,
  RefreshTokenError: [401, "RefreshTokenError", "No refresh token"] as const,
};

export type MyError = readonly [number, string, string, any?];
