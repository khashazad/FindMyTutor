import { User } from "@/lib/models/user";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./section-header";
import { StarRating } from "@/components/rating-star";

type TutorInfoProps = {
  tutor: User;
};

export default async function TutorInfo({ tutor }: TutorInfoProps) {
  return (
    <Card className="w-[400px]">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>{`${tutor.firstName} ${tutor.lastName}`}</CardTitle>
        <div className="pt-1">
          <StarRating rating={tutor.rating || 0} />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-start justify-between"></div>
        <Separator className="my-1" orientation="horizontal" />
        <SectionHeader title="Expertise" />
        <div className="flex flex-wrap gap-4">
          {tutor.expertise.map((ex) => {
            return <Badge className="py-1 px-3 text-sm size-min">{ex}</Badge>;
          })}
        </div>
        <Separator className="my-3" orientation="horizontal" />
        <SectionHeader title={`About`} />
        <div className="bg-gray-800/50 text-black dark:text-white dark:bg-white/10 rounded-md px-4 py-2 text-md font-semibold tracking-wide shadow-black/20 dark:shadow-white/30 shadow-sm">
          {tutor.bio}
        </div>
      </CardContent>
    </Card>
  );
}
