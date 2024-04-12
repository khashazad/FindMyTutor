import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/lib/models/user";
import { connect } from "@/lib/config/db-config";

connect();

export async function GET(
  _: NextRequest,
  { params }: { params: { tutorId: string } },
) {
  try {
    const tutor = await UserModel.findById(params.tutorId);

    if (!tutor)
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });

    return NextResponse.json(tutor, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
