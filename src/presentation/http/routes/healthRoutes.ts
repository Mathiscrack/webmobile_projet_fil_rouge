import { Hono } from "hono";
import { GetHealthController } from "@presentation/http/controllers/health/GetHealthController";

const getHealth = new GetHealthController();

export const healthRoutes = new Hono();

healthRoutes.get("/", (c) => getHealth.handle(c));
