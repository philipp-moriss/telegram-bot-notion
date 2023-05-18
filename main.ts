import { LoggerService } from "./src/logger/logger.service";
import { App } from "./src/newBot/app";
require("dotenv").config();

async function bootstrap() {
  const app = new App(new LoggerService());
  await app.init();
}

bootstrap();
