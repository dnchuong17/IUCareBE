import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as process from "process";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors( {
    origin: ["http://localhost:5173","https://iuhealthcare.vercel.app"],
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });
  await app.listen(process.env.PORT_SERVER);
}
bootstrap();
