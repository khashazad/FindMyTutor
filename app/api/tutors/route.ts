import { NextResponse } from "next/server";
import UserModel, { User } from "@/lib/models/user";
import { Roles } from "@/lib/types/types";
import { connect } from "@/lib/config/db-config";

connect();

export async function GET() {
  try {
    const tutors: User[] = await UserModel.find({ role: Roles.TUTOR });

    return NextResponse.json(tutors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
