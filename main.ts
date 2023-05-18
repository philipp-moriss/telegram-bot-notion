import { LoggerService } from "./src/logger/logger.service";
import { App } from "./src/newBot/app";
import { TasksController } from "./src/tasks/tasks.controller";
require("dotenv").config();

async function bootstrap() {
  const logger = new LoggerService()
  const app = new App(logger, new TasksController(logger));
  await app.init();
}

bootstrap();
