"use client";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { zeroPad } from "@/lib/utils";
import { SessionStatus, TutoringSession } from "@/lib/models/tutoring-session";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateSessionStatus } from "@/actions";
import toast from "react-hot-toast";

type Props = {
  requests: TutoringSession[];
};

export default function PendingRequests({ requests }: Props) {
  const columns: ColumnDef<TutoringSession>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date: Date = new Date(row.original.date);
        return <span>{date.toLocaleDateString("en-US")}</span>;
      },
    },

    {
      accessorKey: "date",
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
                } catch (error: any) {
                  toast.error((error as Error).message);
                }
              }}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="text-black bg-red-400/80 dark:bg-red-600 hover:text-black hover:scale-105 transition "
            >
              Decline
            </Button>
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
