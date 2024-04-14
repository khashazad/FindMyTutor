import { connect } from "@/lib/config/db-config";
import User from "@/lib/models/user";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      about,
      expertise,
      hourlyRate,
    } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 },
      );
    }

    const userWithSamePhoneNumber = await User.findOne({ phoneNumber });

    if (userWithSamePhoneNumber) {
      return NextResponse.json(
        { message: "User already exists with this phoneNumber" },
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
      about,
      expertise,
      role: 0,
      hourlyRate,
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
