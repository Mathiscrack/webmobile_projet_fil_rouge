import { Hono } from "hono";
import { serveStatic } from "@hono/bun";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { errorResponse } from "@presentation/http/response";
import { homeRoutes } from "@presentation/http/routes/homeRoutes";
import { healthRoutes } from "@presentation/http/routes/healthRoutes";
import { categoryRoutes } from "@presentation/http/routes/categoryRoutes";

const DEFAULT_UPLOAD_DIR = "/app/uploads";

export function createApp() {
  const app = new Hono();

  app.use(cors());
  app.use(secureHeaders());
  app.use(logger());

  app.use(
    "/uploads/*",
    serveStatic({
      root: process.env.UPLOAD_DIR ?? DEFAULT_UPLOAD_DIR,
      rewriteRequestPath: (path) => path.replace(/^\/uploads/, ""),
    }),
  );

  app.route("/", homeRoutes);
  app.route("/health", healthRoutes);
  app.route("/categories", categoryRoutes);

  app.notFound((c) => c.json(errorResponse("Route not found"), 404));

  app.onError((error, c) => {
    if (error instanceof HTTPException) {
      return c.json(errorResponse(error.message), error.status);
    }

    console.error(error);

    return c.json(errorResponse("An unexpected error occurred"), 500);
  });

  return app;
}
