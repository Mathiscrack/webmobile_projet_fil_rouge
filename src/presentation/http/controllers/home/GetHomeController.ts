import type { Context } from "hono";
import { successResponse } from "@presentation/http/response";

export class GetHomeController {
  async handle(c: Context): Promise<Response> {
    const response = successResponse(
      { name: "Top Spot API" },
      "API information retrieved",
    );

    return c.json(response);
  }
}
