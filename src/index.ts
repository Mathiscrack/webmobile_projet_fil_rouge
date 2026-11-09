import "reflect-metadata";
import { dataSource } from "@persistence/mariadb/dataSource";
import { seed } from "@persistence/mariadb/seed";

await dataSource.initialize();
await seed(dataSource);

const { createApp } = await import("./app");

export default createApp();
