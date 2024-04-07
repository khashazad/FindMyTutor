import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { GET } from "@/app/api/request/route";
import { SessionRequest } from "@/lib/models/tutoring-request";
import { NextResponse } from "next/server";

export default async function Requests() {
  const session = await getServerSession(authOptions);
  const response = await GET();

  let requests: SessionRequest[] = [];
  if (response.status == 200)
    requests = (await response.json()) as SessionRequest[];

  return (
    <div className="flex flex-1 flex-col justify-between p-4 space-y-8 md:p-10">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Hi {session?.user.name}
          </h2>
          <p className="text-muted-foreground">
            Here are your session requests!
          </p>
        </div>
      </div>
      <div className="mx-10 flex flex-row flex-wrap gap-4 justify-center md:justify-start">
        {requests.length == 0 ? (
          <h1>No Requests found</h1>
        ) : (
          requests.map((req: SessionRequest) => <div>{req.message}</div>)
        )}
      </div>
    </div>
  );
}
