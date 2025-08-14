import { v4 as uuid } from 'uuid';
import { uploadToCloudinary } from '@shared/middlewares/auth/src/lib/cloudinary';

async function testUpload() {
  try {
    // Small red dot PNG base64 (for testing)
    const base64Image =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgL4zj3kAAAAASUVORK5CYII=';

    // Convert base64 string to Buffer
    const buffer = Buffer.from(base64Image, 'base64');

    // Generate filename
    const filename = `test-upload-${uuid()}`;

    // Call upload function
    const url = await uploadToCloudinary(buffer, 'product-images', filename);

    console.log('Upload successful! URL:', url);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

testUpload();
