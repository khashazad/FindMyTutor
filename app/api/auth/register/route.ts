import { connect } from "@/lib/config/db-config";
import User from "@/lib/models/user";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, phoneNumber } =
      await request.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
