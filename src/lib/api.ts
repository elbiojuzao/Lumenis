import connectDB from './db';
import User from '../models/User';
import Product from '../models/Product';

export async function getUsers() {
  await connectDB();
  return User.find({}).select('-password');
}

export async function getUserById(id: string) {
  await connectDB();
  return User.findById(id).select('-password');
}

export async function getUserByEmail(email: string) {
  await connectDB();
  return User.findOne({ email }).select('-password');
}

export async function createUser(userData: any) {
  await connectDB();
  return User.create(userData);
}

export async function getProducts() {
  await connectDB();
  return Product.find({ active: true });
}

export async function getProductById(id: string) {
  await connectDB();
  return Product.findById(id);
}

export async function createProduct(productData: any) {
  await connectDB();
  return Product.create(productData);
}

export async function updateProduct(id: string, productData: any) {
  await connectDB();
  return Product.findByIdAndUpdate(id, productData, { new: true });
}

export async function deleteProduct(id: string) {
  await connectDB();
  return Product.findByIdAndDelete(id);
}