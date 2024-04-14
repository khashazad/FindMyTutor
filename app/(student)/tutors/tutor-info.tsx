import { User } from "@/lib/models/user";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./section-header";
import { StarRating } from "@/components/rating-star";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TutorInfoProps = {
  tutor: User;
};

export default function TutorInfo({ tutor }: TutorInfoProps) {
  return (
    <Card className="w-[400px] bg-teal-700/70 dark:bg-cyan-950 dark:bg-opacity-70">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-3xl">{`${tutor.firstName} ${tutor.lastName}`}</CardTitle>
        <div className="flex justify-between items-center">
          <StarRating rating={tutor.rating || 0} />
          <span className="text-2xl font-bold">{`${tutor.hourlyRate}$ / hour`}</span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Separator
          className="my-1 h-[0.20rem] bg-black/30"
          orientation="horizontal"
        />
        <SectionHeader title="Expertise" />
        <div className="flex flex-wrap gap-4">
          {tutor.expertise.map((ex) => {
            return <Badge className="py-1 px-3 text-sm size-min">{ex}</Badge>;
          })}
        </div>

        <Separator
          className="mt-3 h-[0.20rem] bg-black/30"
          orientation="horizontal"
        />
        <SectionHeader title={`About`} />
        <div className="-m-2 text-center bg-white/50 text-black dark:text-white dark:bg-white/20 rounded-md px-4 py-2 text-md font-semibold tracking-wide shadow-black/20 dark:shadow-black/80 shadow-sm flex-1 min-h-[150px]">
          {tutor.about}
        </div>
        <Separator
          className="mt-6 h-[0.20rem] bg-black/30"
          orientation="horizontal"
        />

        <Link href={`/sessions/new/${tutor._id}`} className="grow ">
          <Button
            variant="outline"
            className="bg-primary-foreground/80 text-md font-semibold w-full"
          >
            Request Session
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
