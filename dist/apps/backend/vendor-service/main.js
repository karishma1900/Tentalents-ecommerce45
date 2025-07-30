// apps/backend/vendor-service/src/main.ts
import dotenv2 from "dotenv";
import path2 from "path";

// apps/backend/vendor-service/src/app.ts
import express from "express";

// libs/shared/swagger/src/lib/setupSwagger.ts
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
function setupSwagger(app2, config3) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: config3.title,
        version: config3.version,
        description: config3.description || ""
        // ✅ Use if provided
      },
      servers: [{ url: "/" }]
    },
    apis: [
      "apps/**/routes/*.ts",
      // Route-based Swagger JSDoc comments
      "apps/**/docs/*.swagger.ts"
      // Dedicated Swagger JSDoc files
    ]
  };
  const swaggerSpec = swaggerJsdoc(options);
  app2.use(config3.path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// libs/shared/error/src/lib/api-error.ts
var ApiError = class extends Error {
  constructor(statusCode, message, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// libs/shared/error/src/lib/error-handler.ts
var errorHandler = (err, req, res, next) => {
  let customError = err;
  if (!(err instanceof ApiError)) {
    customError = new ApiError(500, "Something went wrong");
  }
  const apiError = customError;
  res.status(apiError.statusCode || 500).json({
    success: false,
    message: apiError.message || "Internal Server Error"
  });
};

// libs/shared/error/src/lib/not-found-handler.ts
var notFoundHandler = (req, _res, next) => {
  const message = `\u{1F50D} Not Found - ${req.originalUrl}`;
  next(new ApiError(404, message));
};

// libs/shared/logger/src/lib/logger.ts
import { createLogger, format, transports } from "winston";
var { combine, timestamp, printf, colorize, errors, json } = format;
var serviceName = process.env.LOG_SERVICE_NAME || "unknown-service";
var isProduction = process.env.NODE_ENV === "production";
var devFormat = printf(({ level, message, timestamp: timestamp2, stack }) => {
  return `[${timestamp2}] [${serviceName}] ${level}: ${stack || message}`;
});
var logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    isProduction ? json() : combine(colorize({ all: true }), devFormat)
  ),
  defaultMeta: { service: serviceName },
  transports: [new transports.Console()]
});

// libs/shared/logger/src/lib/loggerMiddleware.ts
var loggerMiddleware = (req, res, next) => {
  const start2 = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start2;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
      }
    );
  });
  next();
};

// libs/shared/auth/src/lib/jwt.ts
import jwt from "jsonwebtoken";
function signToken(payload2, secret, expiresIn = "1h") {
  return jwt.sign(payload2, secret, { expiresIn });
}
function verifyToken(token2, secret) {
  const decoded = jwt.verify(token2, secret);
  if (typeof decoded === "object" && "id" in decoded && "role" in decoded) {
    return decoded;
  }
  throw new Error("Invalid token payload structure");
}

// libs/shared/auth/src/lib/authMiddleware.ts
function authMiddleware(allowedRoles, secret = process.env["JWT_SECRET"]) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Missing or malformed Authorization header" });
      return;
    }
    const token2 = authHeader.split(" ")[1];
    if (!token2) {
      res.status(401).json({ message: "Token not provided" });
      return;
    }
    try {
      const decoded = verifyToken(token2, secret);
      req.user = decoded;
      if (allowedRoles) {
        const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        if (!allowed.includes(req.user.role)) {
          res.status(403).json({
            message: `Forbidden: Role "${req.user.role}" not authorized`
          });
          return;
        }
      }
      next();
    } catch (err) {
      console.error("\u274C [authMiddleware] Token verification failed:", err);
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }
  };
}

// libs/shared/auth/src/lib/generateToken.ts
import dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname2 = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname2, "../../../../..", ".env") });
var JWT_SECRET = process.env.JWT_SECRET || "super_secret";
if (!JWT_SECRET || JWT_SECRET === "super_secret") {
  console.error("\u274C JWT_SECRET not set correctly in .env");
  process.exit(1);
}
var payload = {
  userId: "abc123",
  email: "admin@example.com",
  role: "super_admin"
};
var token = signToken(payload, JWT_SECRET, "1h");
console.log("\n\u{1F510} Generated JWT Token:\n");
console.log(token);
console.log("\n\u{1F449} Use in Authorization header:\n");
console.log(`Authorization: Bearer ${token}`);

// libs/shared/auth/src/lib/oauth.ts
import jwt2 from "jsonwebtoken";

// apps/backend/vendor-service/src/app/routes/vendor.routes.ts
import { Router } from "express";
import multer from "multer";

// apps/backend/vendor-service/src/app/controllers/vendor-controller.ts
import {
  PrismaClient as PrismaClient2
} from "@prisma/client";

// libs/shared/minio/src/lib/minio-client.ts
import { Client } from "minio";
var minioClient = new Client({
  endPoint: process.env["MINIO_ENDPOINT"],
  port: parseInt(process.env["MINIO_PORT"], 10),
  useSSL: false,
  accessKey: process.env["MINIO_ACCESS_KEY"],
  secretKey: process.env["MINIO_SECRET_KEY"]
});
var minio_client_default = minioClient;

// libs/shared/minio/src/lib/minio.ts
async function uploadFileToMinIO({
  bucketName,
  objectName,
  content,
  contentType
}) {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, "us-east-1");
  }
  await minioClient.putObject(bucketName, objectName, content, content.length, {
    "Content-Type": contentType
  });
  return `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${objectName}`;
}

// libs/shared/minio/src/lib/minio-connection.ts
async function connectMinio() {
  try {
    const bucket = "vendor-files";
    const exists = await minio_client_default.bucketExists(bucket);
    if (!exists) {
      await minio_client_default.makeBucket(bucket, "us-east-1");
      logger.info(`\u2705 Created bucket: ${bucket}`);
    } else {
      logger.info(`\u2139\uFE0F Bucket already exists: ${bucket}`);
    }
  } catch (err) {
    logger.error("\u274C Error connecting to MinIO", err);
    throw err;
  }
}
async function disconnectMinio() {
  logger.info("\u2139\uFE0F MinIO client disconnect called (no-op)");
}

// apps/backend/vendor-service/src/app/schemas/vendor.schema.ts
import { z } from "zod";

// libs/shared/types/src/lib/enums/vendor-status.enum.ts
var VendorStatus = /* @__PURE__ */ ((VendorStatus2) => {
  VendorStatus2["PENDING"] = "PENDING";
  VendorStatus2["APPROVED"] = "APPROVED";
  VendorStatus2["REJECTED"] = "REJECTED";
  VendorStatus2["SUSPENDED"] = "SUSPENDED";
  return VendorStatus2;
})(VendorStatus || {});

// apps/backend/vendor-service/src/app/schemas/vendor.schema.ts
var CreateVendorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  userId: z.string(),
  storeName: z.string(),
  storeSlug: z.string(),
  status: z.nativeEnum(VendorStatus).optional(),
  documents: z.array(z.string()).optional()
});
var UpdateVendorSchema = CreateVendorSchema.partial();
var UpdateVendorStatusSchema = z.object({
  id: z.string(),
  // required for update
  status: z.nativeEnum(VendorStatus)
});

// apps/backend/vendor-service/src/app/services/vendor-service.ts
import { PrismaClient } from "@prisma/client";

// libs/shared/kafka/src/lib/kafka-client.ts
import { Kafka } from "kafkajs";
var kafka = null;
var getKafkaInstance = () => {
  if (!kafka) {
    throw new Error("Kafka is not initialized. Call initKafka() first.");
  }
  return kafka;
};

// libs/shared/kafka/src/lib/kafka-config.ts
import { logLevel } from "kafkajs";
var kafkaConfig = {
  clientId: "hktvmall-style-backend",
  brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
  logLevel: logLevel.INFO
  // Uncomment only if your KRaft cluster requires auth
  /*
  ssl: true,
  sasl: {
    mechanism: 'plain', // Or 'scram-sha-256' or 'scram-sha-512'
    username: process.env.KAFKA_USERNAME || '',
    password: process.env.KAFKA_PASSWORD || '',
  },
  */
};

// libs/shared/kafka/src/lib/kafka-producer.ts
var producer = null;
async function connectKafkaProducer() {
  if (producer) {
    logger.debug("[Kafka Producer] \u{1F7E2} Already connected");
    return producer;
  }
  const kafka2 = getKafkaInstance();
  if (!kafka2) {
    throw new Error("[Kafka Producer] \u274C Kafka is not initialized");
  }
  producer = kafka2.producer();
  try {
    await producer.connect();
    logger.info("[Kafka Producer] \u2705 Connected");
    return producer;
  } catch (error) {
    logger.error("[Kafka Producer] \u274C Connection failed:", error);
    producer = null;
    throw error;
  }
}
async function produceKafkaEvent(record) {
  try {
    const activeProducer = await connectKafkaProducer();
    await activeProducer.send(record);
    logger.info(`[Kafka Producer] \u{1F4E4} Sent message to topic "${record.topic}"`);
    logger.debug(`[Kafka Producer] \u{1F50D} Payload: ${JSON.stringify(record)}`);
  } catch (error) {
    logger.error("[Kafka Producer] \u274C Failed to send message:", error);
    throw error;
  }
}
async function disconnectKafkaProducer() {
  if (!producer) {
    logger.warn("[Kafka Producer] \u26A0\uFE0F No active producer to disconnect.");
    return;
  }
  try {
    await producer.disconnect();
    logger.info("[Kafka Producer] \u{1F50C} Disconnected");
  } catch (error) {
    logger.error("[Kafka Producer] \u274C Disconnection failed:", error);
  } finally {
    producer = null;
  }
}

// libs/shared/kafka/src/lib/kafka-topics.ts
var KAFKA_TOPICS = {
  USER: {
    CREATED: "user.created",
    UPDATED: "user.updated",
    DELETED: "user.deleted",
    REGISTERED: "user.registered"
  },
  ORDER: {
    CREATED: "order.created",
    STATUS_UPDATED: "order.status.updated",
    CANCELLED: "order.cancelled"
  },
  PAYMENT: {
    INITIATED: "payment.initiated",
    SUCCESS: "payment.success",
    FAILED: "payment.failed"
  },
  PRODUCT: {
    CREATED: "product.created",
    UPDATED: "product.updated",
    DELETED: "product.deleted",
    RATED: "product.rated"
  },
  EMAIL: {
    USER_CREATED: "email.user.created",
    ORDER_CREATED: "email.order.created",
    PAYMENT_SUCCESS: "email.payment.success"
  },
  INVOICE: {
    GENERATE: "invoice.generate",
    GENERATED: "invoice.generated",
    FAILED: "invoice.failed"
  },
  NOTIFICATION: {
    SENT: "notification.sent"
  },
  CART: {
    UPDATED: "cart.updated",
    CHECKED_OUT: "cart.checkedout"
  },
  ANALYTICS: {
    USER_BEHAVIOR_RECORDED: "analytics.user.behavior"
  },
  SEARCH: {
    SYNC_PRODUCT_INDEX: "search.sync.product"
  },
  VENDOR: {
    CREATED: "vendor.created",
    STATUS_UPDATED: "vendor.status.updated"
  }
};
var ALL_KAFKA_TOPICS = Object.values(KAFKA_TOPICS).flatMap(
  (group) => Object.values(group)
);

// libs/shared/constants/src/lib/jwt-config.ts
var JWT_CONFIG = {
  secret: process.env.JWT_SECRET || "default_jwt_secret",
  expiresIn: "1d"
};

// libs/shared/constants/src/lib/service-ports.ts
var SERVICE_PORTS = {
  ["user-service" /* USER */]: 3e3,
  ["product-service" /* PRODUCT */]: 3001,
  ["order-service" /* ORDER */]: 3002,
  ["rating-service" /* RATING */]: 3003,
  ["email-service" /* EMAIL */]: 3004,
  ["payment-service" /* PAYMENT */]: 3005,
  ["search-service" /* SEARCH */]: 3006,
  ["cart-service" /* CART */]: 3007,
  ["admin-service" /* ADMIN */]: 3008,
  ["invoice-service" /* INVOICE */]: 3009,
  ["analytics-service" /* ANALYTICS */]: 3010,
  ["vendor-service" /* VENDOR */]: 3011
};

// apps/backend/vendor-service/src/app/services/vendor-service.ts
var prisma = new PrismaClient();
var vendorService = {
  async register(data) {
    const vendor = await prisma.vendor.create({ data });
    const createdEvent = {
      vendorId: vendor.id,
      name: vendor.name,
      status: vendor.status,
      createdAt: vendor.createdAt.toISOString()
    };
    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.CREATED,
      messages: [{ value: JSON.stringify(createdEvent) }]
    });
    const statusUpdatedEvent = {
      vendorId: vendor.id,
      status: vendor.status,
      updatedAt: vendor.createdAt.toISOString()
    };
    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
      messages: [{ value: JSON.stringify(statusUpdatedEvent) }]
    });
    logger.info(
      `[${"vendor-service" /* VENDOR */}] Vendor registered and status emitted: ${vendor.id}`
    );
    return vendor;
  },
  async updateStatus(id, status) {
    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        status: { set: status }
      }
    });
    const event = {
      vendorId: vendor.id,
      status: vendor.status,
      updatedAt: vendor.updatedAt.toISOString()
    };
    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
      messages: [{ value: JSON.stringify(event) }]
    });
    logger.info(
      `[${"vendor-service" /* VENDOR */}] Vendor status updated: ${vendor.id}`
    );
    return vendor;
  },
  async getById(id) {
    return prisma.vendor.findUnique({ where: { id } });
  }
};

// apps/backend/vendor-service/src/app/controllers/vendor-controller.ts
var prisma2 = new PrismaClient2();
function toPrismaStatus(status) {
  return status;
}
var createVendor = async (req, res) => {
  try {
    const result = CreateVendorSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }
    const dto = result.data;
    const vendor = await prisma2.vendor.create({
      data: {
        ...dto,
        status: toPrismaStatus(dto.status ?? "PENDING" /* PENDING */)
      }
    });
    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.CREATED,
      messages: [
        {
          value: JSON.stringify({
            vendorId: vendor.id,
            name: vendor.name,
            email: vendor.email,
            status: vendor.status,
            createdAt: vendor.createdAt.toISOString()
          })
        }
      ]
    });
    return res.status(201).json({ vendor });
  } catch (err) {
    logger.error("Error creating vendor", err);
    return res.status(500).json({ error: "Failed to create vendor" });
  }
};
var updateVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const result = UpdateVendorSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }
    const dto = result.data;
    const updateData = { ...dto };
    if (dto.status !== void 0) {
      updateData.status = toPrismaStatus(dto.status);
    }
    const vendor = await prisma2.vendor.update({
      where: { id: vendorId },
      data: updateData
    });
    if (dto.status !== void 0) {
      await produceKafkaEvent({
        topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
        messages: [
          {
            value: JSON.stringify({
              vendorId: vendor.id,
              status: vendor.status,
              updatedAt: vendor.updatedAt.toISOString()
            })
          }
        ]
      });
    }
    return res.status(200).json({ vendor });
  } catch (err) {
    logger.error("Error updating vendor", err);
    return res.status(500).json({ error: "Failed to update vendor" });
  }
};
var getVendorById = async (req, res) => {
  try {
    const vendor = await prisma2.vendor.findUnique({
      where: { id: req.params.id }
    });
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    return res.status(200).json({ vendor });
  } catch (err) {
    logger.error("Error fetching vendor by ID", err);
    return res.status(500).json({ error: "Failed to fetch vendor" });
  }
};
var getAllVendors = async (_req, res) => {
  try {
    const vendors = await prisma2.vendor.findMany();
    return res.status(200).json({ vendors });
  } catch (err) {
    logger.error("Error fetching all vendors", err);
    return res.status(500).json({ error: "Failed to fetch vendors" });
  }
};
var deleteVendor = async (req, res) => {
  try {
    await prisma2.vendor.delete({
      where: { id: req.params.id }
    });
    return res.status(204).send();
  } catch (err) {
    logger.error("Error deleting vendor", err);
    return res.status(500).json({ error: "Failed to delete vendor" });
  }
};
var uploadVendorDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const uploadedUrls = [];
    for (const file of files) {
      const fileName = `vendor-docs/${id}/${Date.now()}-${file.originalname}`;
      const url = await uploadFileToMinIO({
        bucketName: "vendor-docs",
        objectName: fileName,
        content: file.buffer,
        contentType: file.mimetype
      });
      uploadedUrls.push(url);
    }
    const vendor = await prisma2.vendor.update({
      where: { id },
      data: {
        documents: {
          push: uploadedUrls
        }
      }
    });
    res.status(200).json({
      message: "Documents uploaded successfully",
      urls: uploadedUrls,
      vendor
    });
  } catch (err) {
    logger.error("Error uploading vendor documents", err);
    return res.status(500).json({ message: "Failed to upload documents" });
  }
};
var approveVendor = async (req, res) => {
  try {
    const data = UpdateVendorStatusSchema.parse({
      id: req.params.id,
      status: "APPROVED"
    });
    const vendor = await vendorService.updateStatus(data.id, data.status);
    res.json({ success: true, data: vendor });
  } catch (err) {
    logger.error("Approve Vendor Error:", err);
    return res.status(400).json({ success: false, error: "Failed to approve vendor" });
  }
};
var rejectVendor = async (req, res) => {
  try {
    const data = UpdateVendorStatusSchema.parse({
      id: req.params.id,
      status: "REJECTED"
    });
    const vendor = await vendorService.updateStatus(data.id, data.status);
    res.json({ success: true, data: vendor });
  } catch (err) {
    logger.error("Reject Vendor Error:", err);
    return res.status(400).json({ success: false, error: "Failed to reject vendor" });
  }
};
var getVendorAnalytics = async (_req, res) => {
  try {
  } catch (err) {
    logger.error("Vendor Analytics Error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch analytics" });
  }
};

// apps/backend/vendor-service/src/app/routes/vendor.routes.ts
var router = Router();
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  // 5 MB per file
  fileFilter: (req, file, cb) => {
    const isAccepted = file.mimetype.startsWith("image/") || file.mimetype.startsWith("application/");
    if (!isAccepted) {
      return cb(new Error("Only images or documents are allowed"));
    }
    cb(null, true);
  }
});
router.post("/", authMiddleware("seller" /* SELLER */), createVendor);
router.get("/", authMiddleware("admin" /* ADMIN */), getAllVendors);
router.get("/:id", authMiddleware(), getVendorById);
router.put("/:id", authMiddleware("seller" /* SELLER */), updateVendor);
router.delete("/:id", authMiddleware("admin" /* ADMIN */), deleteVendor);
router.post(
  "/:id/documents",
  authMiddleware("seller" /* SELLER */),
  upload.array("documents"),
  uploadVendorDocuments
);
router.patch("/:id/approve", authMiddleware("admin" /* ADMIN */), approveVendor);
router.patch("/:id/reject", authMiddleware("admin" /* ADMIN */), rejectVendor);
router.get(
  "/:id/analytics",
  authMiddleware(["admin" /* ADMIN */, "seller" /* SELLER */]),
  getVendorAnalytics
);
var vendor_routes_default = router;

// apps/backend/vendor-service/src/app.ts
var app = express();
app.use(express.json());
app.use(loggerMiddleware);
app.use(authMiddleware());
setupSwagger(app, {
  title: "Vendor Service",
  version: "1.0.0",
  path: "/api/docs/vendor"
});
app.use("/api/vendor", vendor_routes_default);
app.get("/healthz", (_req, res) => {
  return res.status(200).send("\u2705 Vendor Service healthy");
});
app.use(notFoundHandler);
app.use(errorHandler);
var app_default = app;

// libs/shared/config/src/lib/env.ts
var env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000", 10),
  // PostgreSQL
  POSTGRES_HOST: process.env.POSTGRES_HOST || "",
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  POSTGRES_DB: process.env.POSTGRES_DB || "",
  POSTGRES_USER: process.env.POSTGRES_USER || "",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
  // Redis
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),
  // Kafka
  KAFKA_BROKER: process.env.KAFKA_BROKER || "localhost:9092",
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || "",
  KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || "",
  // SMTP (Email)
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@mvp-shop.com",
  // ImageKit
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT || "",
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || "",
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || "",
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "fallback_jwt_secret",
  // MinIO
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || "localhost",
  MINIO_PORT: Number(process.env.MINIO_PORT) || 9e3,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || "",
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || "",
  MINIO_BUCKET_NAME: process.env.MINIO_BUCKET_NAME || "invoices",
  // ✅ Service Name
  SERVICE_NAME: process.env.SERVICE_NAME || "unknown-service"
};

// libs/shared/config/src/lib/postgres.ts
var postgresUrl = `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`;

// libs/shared/config/src/lib/redis.ts
var redisConfig = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT
};

// libs/shared/config/src/lib/kafka.ts
var kafkaConfig2 = {
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKER.split(","),
  // Support comma-separated brokers
  groupId: env.KAFKA_GROUP_ID
};

// libs/shared/config/src/lib/jwt.ts
var jwtConfig = {
  secret: env.JWT_SECRET
};

// libs/shared/config/src/lib/smtp.ts
var smtpConfig = {
  host: env.SMTP_HOST || "",
  port: env.SMTP_PORT || 587,
  user: env.SMTP_USER || "",
  pass: env.SMTP_PASS || ""
};

// libs/shared/config/src/lib/minio.ts
var minioConfig = {
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
  bucket: env.MINIO_BUCKET_NAME
};

// libs/shared/config/src/lib/imagekit.ts
var imageKitConfig = {
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT || "",
  publicKey: env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: env.IMAGEKIT_PRIVATE_KEY || ""
};

// libs/shared/config/src/lib/config.ts
var config = {
  env: env.NODE_ENV,
  port: env.PORT,
  serviceName: env.SERVICE_NAME || "unknown-service",
  // ✅ Added serviceName with fallback
  postgres: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    db: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD
  },
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
  },
  kafka: {
    broker: env.KAFKA_BROKER,
    clientId: env.KAFKA_CLIENT_ID,
    groupId: env.KAFKA_GROUP_ID
  },
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.EMAIL_FROM
  },
  jwt: {
    secret: env.JWT_SECRET
  },
  minio: {
    endpoint: env.MINIO_ENDPOINT,
    port: env.MINIO_PORT,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
    bucketName: env.MINIO_BUCKET_NAME
  },
  imagekit: {
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY
  }
};

// libs/shared/config/src/index.ts
var config2 = {
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",
  service: {
    port: Number(process.env.PORT) || 3e3
  }
  // other config properties here
};

// libs/shared/redis/src/lib/keys.ts
var DEFAULT_TTL = 60 * 60;

// libs/shared/redis/src/lib/redis.ts
import { createClient } from "redis";
var redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379
  },
  password: process.env.REDIS_PASSWORD || void 0
});
async function connectRedis() {
  redisClient.on("error", (err) => logger.error("\u274C Redis Error:", err));
  await redisClient.connect();
  logger.info("\u2705 Redis connected");
}
async function disconnectRedis() {
  await redisClient.quit();
  logger.info("\u{1F50C} Redis disconnected");
}

// apps/backend/vendor-service/src/main.ts
dotenv2.config({ path: path2.resolve(__dirname, "../../.env") });
var PORT = config2.service.port;
async function start() {
  let server;
  try {
    await Promise.all([
      connectKafkaProducer(),
      connectRedis(),
      connectMinio()
      // connectMinio now handles bucket creation
    ]);
    server = app_default.listen(PORT, () => {
      logger.info(`\u{1F680} Vendor Service is running at http://localhost:${PORT}`);
      logger.info(
        `\u{1F4DA} Swagger docs available at http://localhost:${PORT}/api/docs/vendor`
      );
    });
    const shutdown = async () => {
      logger.info("\u{1F6D1} Gracefully shutting down Vendor Service...");
      try {
        await Promise.all([
          disconnectKafkaProducer(),
          disconnectRedis(),
          disconnectMinio()
          // graceful shutdown (no-op)
        ]);
        server?.close(() => {
          logger.info("\u2705 Vendor Service shut down cleanly");
          process.exit(0);
        });
      } catch (err) {
        logger.error("\u274C Error during shutdown:", err);
        process.exit(1);
      }
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    logger.error("\u274C Failed to start Vendor Service:", err);
    process.exit(1);
  }
}
start();
