"use client";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { zeroPad } from "@/lib/utils";
import { SessionRequest } from "@/lib/models/session-request";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  requests: SessionRequest[];
};

export default function PendingRequests({ requests }: Props) {
  const columns: ColumnDef<SessionRequest>[] = [
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
        const request = row.original;

        return (
          <div className="flex gap-x-3">
            <Button variant="outline">Accept</Button>
            <Button variant="outline">Decline</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card className="w-full md:w-2/3">
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
