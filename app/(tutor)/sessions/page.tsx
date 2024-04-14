import { getServerSession } from "next-auth";
import { GET } from "@/app/api/tutoring-session/route";
import { TutoringSession } from "@/lib/models/tutoring-session";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingRequests from "./pending-sessions";
import AcceptedRequests from "./upcoming-sessions";
import DeclinedRequests from "./declined-sessions";
import { authOptions } from "@/lib/config/auth/authOptions";

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
      <div className="mx-2 md:mx-10 flex justify-center flex-wrap gap-4">
        {requests.length == 0 ? (
          <h1>No Requests found</h1>
        ) : (
          <Tabs defaultValue="pending" className="w-full md:w-2/3">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="flex justify-center">
              <PendingRequests requests={pendingRequests} />
            </TabsContent>
            <TabsContent value="accepted" className="flex justify-center">
              <AcceptedRequests requests={acceptedRequests} />
            </TabsContent>
            <TabsContent value="declined" className="flex justify-center">
              <DeclinedRequests requests={declinedRequests} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
