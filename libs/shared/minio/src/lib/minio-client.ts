import { Client } from 'minio';

export const minioClient = new Client({
  endPoint: process.env['MINIO_ENDPOINT']!,         // No https://
  port: parseInt(process.env['MINIO_PORT']!, 10),   // 443
  useSSL: process.env['MINIO_USE_SSL'] === 'true',  // true
  accessKey: process.env['MINIO_ACCESS_KEY']!,
  secretKey: process.env['MINIO_SECRET_KEY']!,
});

export default minioClient;

// npm install minio
// npm install --save-dev @types/minio
