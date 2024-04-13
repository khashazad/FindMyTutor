"use server";
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("MONGODB_DB not defined");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(`${MONGO_URI}}`)
      .then((mongoose: any) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
