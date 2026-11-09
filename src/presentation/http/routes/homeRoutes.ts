import { Hono } from "hono";
import { GetHomeController } from "@presentation/http/controllers/home/GetHomeController";

const getHome = new GetHomeController();

export const homeRoutes = new Hono();

homeRoutes.get("/", (c) => getHome.handle(c));
