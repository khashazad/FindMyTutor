import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GET } from "@/app/api/tutors/route";
import { User } from "@/lib/models/user";
import { Session, getServerSession } from "next-auth";
import TutorInfo from "@/app/(student)/tutors/tutor-info";

export default async function BrowseTutorsPage() {
  const response = await GET();

  const tutors: User[] = await response.json();
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <div className="flex flex-1 flex-col p-4 space-y-8 md:p-10">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Hi {session.user.name}
          </h2>
          <p className="text-muted-foreground">
            Here are the available tutors!
          </p>
        </div>
        <div className="flex items-center md:mr-16"></div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start">
        {tutors.length === 0 ? (
          <h1>No tutors found</h1>
        ) : (
          tutors.map((tutor) => {
            return <TutorInfo key={tutor.email} tutor={tutor} />;
          })
        )}
      </div>
    </div>
  );
}
