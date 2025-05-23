import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as process from "process";
import {NestExpressApplication} from "@nestjs/platform-express";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors( {
    origin: ["http://localhost:5173","https://iuhealthcare.vercel.app", "http://localhost:3000"],
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      tls: {}
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT_SERVER);
}
bootstrap();
