import { NextRequest, NextResponse } from "next/server";
import TutoringSession from "@/lib/models/tutoring-session";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Roles } from "@/lib/types/types";
import { connect } from "@/lib/config/db-config";
import { ObjectId } from "mongodb";

connect();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { id, role } = session.user;

  const filterKey = Number(role) != Roles.TUTOR ? "student" : "tutor";

  const tutoringRequests = await TutoringSession.find({ [filterKey]: id });

  return NextResponse.json(tutoringRequests, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { id, role } = session.user;

  if (Number(role) != Roles.STUDENT)
    return NextResponse.json(
      { error: "Must be a  student to request session" },
      { status: 403 },
    );

  try {
    const { message, date, tutor, subject } = await request.json();

    const tutoringRequest = new TutoringSession({
      message,
      date,
      tutor,
      subject,
      student: id,
    });

    const createdRequest = await tutoringRequest.save();

    return NextResponse.json({
      message: "Request created successfully",
      success: true,
      createdRequest,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { sessionId, status } = await request.json();
  console.log(sessionId, status);
  try {
    await TutoringSession.findByIdAndUpdate(new ObjectId(sessionId), {
      $set: { status },
    });

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
