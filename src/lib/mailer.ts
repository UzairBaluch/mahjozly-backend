import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

// Lazy singleton — avoids constructing SMTP transport during import side effects.
let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: Number(env.SMTP_PORT) === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
  return transporter;
};

export { getTransporter };
