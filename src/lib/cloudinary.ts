import crypto from 'node:crypto';
import { env } from '../config/env.js';

type UploadBase64ImageResult = {
  secureUrl: string;
  publicId: string;
};

// Uploads raw base64 image bytes to Cloudinary using signed `upload` API (no extra npm deps).
const uploadBase64Image = async (
  base64: string,
  opts: { folder: string; publicId: string },
): Promise<UploadBase64ImageResult> => {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const paramsToSign = `folder=${opts.folder}&public_id=${opts.publicId}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash('sha1')
    .update(paramsToSign + env.CLOUDINARY_API_SECRET)
    .digest('hex');

  const buffer = Buffer.from(base64, 'base64');
  const file = new File([buffer], 'upload.bin', { type: 'application/octet-stream' });

  const form = new FormData();
  form.set('file', file);
  form.set('api_key', env.CLOUDINARY_API_KEY);
  form.set('timestamp', timestamp);
  form.set('signature', signature);
  form.set('folder', opts.folder);
  form.set('public_id', opts.publicId);

  const url = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const res = await fetch(url, { method: 'POST', body: form });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Cloudinary upload failed (${res.status}): ${text}`);
  }
  const json = (await res.json()) as { secure_url?: string; public_id?: string };
  if (!json.secure_url || !json.public_id) {
    throw new Error('Cloudinary upload returned unexpected payload');
  }
  return { secureUrl: json.secure_url, publicId: json.public_id };
};

export { uploadBase64Image };
