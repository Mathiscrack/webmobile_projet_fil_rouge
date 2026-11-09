import type { Context } from "hono";
import { successResponse } from "@presentation/http/response";

export class GetHealthController {
  async handle(c: Context): Promise<Response> {
    const response = successResponse(
      { status: "healthy", uptime: Math.floor(process.uptime()) + "s" },
      "API is healthy",
    );

    return c.json(response);
  }
}
