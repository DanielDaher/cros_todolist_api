import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const errorMessages = (error: ZodError) => {
  const validationErrors = fromZodError(error).details.map((error) => ({
    [error.path.join("_")]: error.message
  }));
  return validationErrors.reduce((acc, error) => {
    for (const key in error) {
      if (error.hasOwnProperty(key)) {
        acc[key] = error[key];
      }
    }
    return acc;
  }, {});
};
