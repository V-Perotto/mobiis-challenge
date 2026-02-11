import "reflect-metadata";
import { createExpressServer, getMetadataArgsStorage, useContainer } from "routing-controllers";
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import * as swaggerUi from 'swagger-ui-express';
import { Container } from "typedi";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserController } from "./controllers/user.controller";

dotenv.config();
useContainer(Container);

const port = Number(process.env.PORT) || 3000;
const frontendUrl = String(process.env.FRONTEND_URL) || "*";

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('✅ MongoDB conectado com suconst frontendUrl = process.env.FRONTEND_URL || "*";cesso!'))
  .catch((err: any) => console.error('❌ Erro de conexão com MongoDB:', err));

const routingControllersOptions = {
  cors: {
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  controllers: [
    UserController
  ],
  defaultErrorHandler: true,
  classTransformer: true,
}

const app = createExpressServer(routingControllersOptions);

const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});

const storage = getMetadataArgsStorage();

const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  info: {
    title: 'Mobiis Challenge API',
    description: 'API para gerenciamento de usuários com autenticação JWT',
    version: '1.0.0',
  },
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

app.listen(port, () => {
  console.log(`🚀 Server is running on: http://localhost:${port}`);
  console.log(`📄 Swagger Docs on: http://localhost:${port}/api-docs`);
});
