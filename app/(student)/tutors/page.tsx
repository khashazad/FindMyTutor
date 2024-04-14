"use client";
import { User } from "@/lib/models/user";
import TutorInfo from "@/app/(student)/tutors/tutor-info";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Categories } from "@/lib/types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/loading-spinner";

export default function BrowseTutorsPage() {
  const [allAvailableTutors, setAllAvailableTutors] = useState<User[]>([]);
  const [tutors, setTutors] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchTutors() {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/tutors`);

        setAllAvailableTutors(response.data);
      } catch (error: any) {
        let message = "An error occurred while fetching tutors";

        if (error.response && error.response.data.message)
          message = error.response.data.message;

        console.log(error);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    }
    fetchTutors();
  }, []);

  useEffect(() => {
    if (filter.length == 0) {
      setTutors(allAvailableTutors);
    } else {
      const filteredTutors = allAvailableTutors.filter((tutor) =>
        filter.every((filter) => tutor.expertise.includes(filter)),
      );
      setTutors(filteredTutors);
    }
  }, [filter, allAvailableTutors]);

  return (
    <div className="flex flex-1 flex-col p-4 space-y-8 md:p-10">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Hi {session?.user.name}
          </h2>
          <p className="text-muted-foreground">
            Here are the available tutors!
          </p>
        </div>

        <div className="flex items-center md:mr-16">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter by expertise</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Expertise</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Categories.map((cat: string) => (
                <DropdownMenuCheckboxItem
                  key={cat}
                  checked={filter.includes(cat) ? true : false}
                  onCheckedChange={() => {
                    if (!filter.includes(cat)) {
                      setFilter((prev) => [...prev, cat]);
                    } else {
                      const referencedArray = [...filter];
                      const indexOfItemToBeRemoved =
                        referencedArray.indexOf(cat);
                      referencedArray.splice(indexOfItemToBeRemoved, 1);
                      setFilter(referencedArray);
                    }
                  }}
                >
                  {cat}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mx-10 flex flex-row flex-wrap gap-4 justify-center md:justify-start">
        {loading ? (
          <LoadingSpinner />
        ) : tutors.length === 0 ? (
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
