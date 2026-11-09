import { HTTPException } from "hono/http-exception";
import type { ZodType } from "zod";

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new HTTPException(400, { message: `Invalid request (${message})` });
  }

  return result.data;
}
