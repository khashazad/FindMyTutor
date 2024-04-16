import { getServerSession } from "next-auth";
import { GET } from "@/app/api/tutoring-session/route";
import { TutoringSession } from "@/lib/models/tutoring-session";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sessions from "./sessions";
import { authOptions } from "@/lib/config/auth/authOptions";
import PendingSessions from "./pending-sessions";
import DeclinedSessions from "./declined-sessions";

export default async function Requests() {
  const session = await getServerSession(authOptions);
  const response = await GET();

  let requests: TutoringSession[] = [];

  if (response.status == 200)
    requests = (await response.json()) as TutoringSession[];

  const pendingSessions = requests.filter((req) => req.status == "pending");
  const upcomingSessions = requests.filter(
    (req) =>
      req.status == "accepted" && new Date(req.date).getTime() >= Date.now(),
  );
  const pastSessions = requests.filter(
    (req) =>
      req.status == "accepted" && new Date(req.date).getTime() < Date.now(),
  );
  const declinedSessions = requests.filter((req) => req.status == "declined");

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
      <div className="flex flex-wrap gap-4 w-full">
        {requests.length == 0 ? (
          <h1>No Requests found</h1>
        ) : (
          <Tabs defaultValue="pending" className="md:mx-4 w-full">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Requested</TabsTrigger>

              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="flex justify-center">
              <Sessions requests={upcomingSessions} />
            </TabsContent>
            <TabsContent value="pending" className="flex justify-center">
              <PendingSessions requests={pendingSessions} />
            </TabsContent>
            <TabsContent value="past" className="flex justify-center">
              <Sessions requests={pastSessions} />
            </TabsContent>
            <TabsContent value="declined" className="flex justify-center">
              <DeclinedSessions requests={declinedSessions} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
