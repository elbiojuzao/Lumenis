import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../models/User';
import { nanoid } from 'nanoid';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@example.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD
  }
});

interface TokenPayload {
  id: string;
  isAdmin: boolean;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d'
  });
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateEmailToken = (): string => {
  return nanoid(32);
};

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  name: string;
}): Promise<{ user: any; token: string }> => {
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email: userData.email }, { username: userData.username }]
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password);

  // Generate email verification token
  const emailToken = generateEmailToken();
  const emailTokenExpira = new Date();
  emailTokenExpira.setHours(emailTokenExpira.getHours() + 24);

  // Create new user
  const user = await User.create({
    ...userData,
    senha: hashedPassword,
    emailToken,
    emailTokenExpira,
    emailVerificado: false,
    dataCriada: new Date(),
    dataModificacao: new Date()
  });

  // Send verification email
  await sendVerificationEmail(userData.email, emailToken);

  // Generate JWT
  const token = generateToken({ id: user._id.toString(), isAdmin: false });

  return { user, token };
};

export const loginUser = async (email: string, password: string): Promise<{ user: any; token: string }> => {
  // Find user
  const user = await User.findOne({ email }).select('+senha');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isValid = await comparePasswords(password, user.senha);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  // Update last login
  user.ultimoLogin = new Date();
  await user.save();

  // Generate JWT
  const token = generateToken({ id: user._id.toString(), isAdmin: false });

  // Remove password from response
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.senha;

  return { user: userWithoutPassword, token };
};

export const verifyEmail = async (token: string): Promise<void> => {
  const user = await User.findOne({
    emailToken: token,
    emailTokenExpira: { $gt: new Date() }
  });

  if (!user) {
    throw new Error('Invalid or expired verification token');
  }

  user.emailVerificado = true;
  user.emailToken = undefined;
  user.emailTokenExpira = undefined;
  await user.save();
};

export const resendVerificationEmail = async (userId: string): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.emailVerificado) {
    throw new Error('Email already verified');
  }

  // Generate new token
  const emailToken = generateEmailToken();
  const emailTokenExpira = new Date();
  emailTokenExpira.setHours(emailTokenExpira.getHours() + 24);

  user.emailToken = emailToken;
  user.emailTokenExpira = emailTokenExpira;
  await user.save();

  // Send new verification email
  await sendVerificationEmail(user.email, emailToken);
};