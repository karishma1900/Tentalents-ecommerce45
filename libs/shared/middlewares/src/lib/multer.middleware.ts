import multer, { FileFilterCallback } from 'multer';
import type { Request } from 'express';
import type { Multer } from 'multer';
import type { Express } from 'express'; // For Express.Multer.File

// Use in-memory storage (can be swapped for diskStorage, etc.)
const storage = multer.memoryStorage();

// Allowed MIME types
const ALLOWED_MIME_TYPES = ['image/', 'application/'];

// File filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File, // ✅ Use the correct type here
  cb: FileFilterCallback
): void => {
  const isAllowed = ALLOWED_MIME_TYPES.some((type) =>
    file.mimetype.startsWith(type)
  );

  if (!isAllowed) {
    return cb(new Error('Only image and document files are allowed'));
  }

  cb(null, true);
};

// Multer upload instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
