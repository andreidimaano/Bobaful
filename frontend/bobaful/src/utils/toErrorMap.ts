import { AuthenticationError } from "../generated/graphql";

export const toErrorMap = (errors: AuthenticationError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
