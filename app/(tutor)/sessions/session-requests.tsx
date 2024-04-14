"use client";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { cn, zeroPad } from "@/lib/utils";
import { TutoringSession } from "@/lib/models/tutoring-session";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateSessionStatus } from "@/actions";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TDeclineSession,
  declineSession,
} from "@/lib/validations/tutoring-request-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Props = {
  requests: TutoringSession[];
};

export default function SessionRequests({ requests }: Props) {
  const form = useForm<TDeclineSession>({
    resolver: zodResolver(declineSession),
  });

  const router = useRouter();

  const { register, handleSubmit } = form;

  const onSubmit = async (data: TDeclineSession) => {
    try {
      await updateSessionStatus(data.session, "declined", data.reason);

      router.refresh();
    } catch (error: any) {
      toast.error((error as Error).message);
    }
  };

  const columns: ColumnDef<TutoringSession>[] = [
    {
      header: "Date",
      cell: ({ row }) => {
        const date: Date = new Date(row.original.date);
        return <span>{date.toLocaleDateString("en-US")}</span>;
      },
    },

    {
      header: "Time",
      cell: ({ row }) => {
        const startDate: Date = new Date(row.original.date);

        return (
          <span>
            {`${new Date(startDate).getHours()}:${zeroPad(
              new Date(startDate).getMinutes(),
              2,
            )}`}
          </span>
        );
      },
    },

    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      id: "action",
      cell: ({ row }) => {
        const session = row.original;

        return (
          <div className="flex justify-center gap-x-3">
            <Button
              variant="outline"
              className="text-black bg-green-400/80 dark:bg-green-600 hover:text-black hover:scale-105 transition "
              onClick={async () => {
                try {
                  await updateSessionStatus(session._id, "accepted");
                  router.refresh();
                } catch (error: any) {
                  toast.error((error as Error).message);
                }
              }}
            >
              Accept
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="text-black bg-red-400/80 dark:bg-red-600 hover:text-black hover:scale-105 transition "
                >
                  Decline
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <form
                  className="flex flex-col gap-y-4 mt-8"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    type="hidden"
                    {...register("session", { value: session._id })}
                  />
                  <div className="flex flex-col w-full">
                    <h2
                      className={cn(
                        "w-[18rem] flex justify-center mb-3 px-3 text-white outline-none font-semibold text-lg text-gray-700/90 dark:text-white/80",
                      )}
                    >
                      Reason
                    </h2>

                    <div className="flex-grow flex flex-col">
                      <input
                        type="text"
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                        {...register("reason")}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button type="submit" variant="secondary">
                      Decline
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
    },
  ];

  return (
    <Card className="w-full">
      <CardContent className="m-1 p-3 border-none dark:bg-slate-800/80">
        <DataTable
          columns={columns}
          data={requests}
          showColumnVisibility={false}
          showRowsPerPage={false}
        />
      </CardContent>
    </Card>
  );
}
