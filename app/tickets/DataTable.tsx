import { Ticket } from "@prisma/client";
import { FC, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { SearchParams } from "./page";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const tableHeaders = [
  {
    value: "title",
    label: "Title",
  },
  {
    value: "status",
    label: "Status",
  },
  {
    value: "priority",
    label: "Priority",
  },
  {
    value: "createdAt",
    label: "Created at",
  },
];

const TicketsDataTable: FC<Props> = ({ tickets, searchParams }) => {
  const toggledDirection = searchParams.direction === "desc" ? "asc" : "desc";

  return (
    <div className="w-full mt-5 rounded-md sm:border">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map(({ label, value }) => (
              <TableHead key={value}>
                <Link
                  className="cursor-pointer"
                  href={{
                    query: {
                      ...searchParams,
                      page: undefined,
                      orderBy: value,
                      direction:
                        searchParams.orderBy === value
                          ? toggledDirection
                          : "desc",
                    },
                  }}
                >
                  {label}
                </Link>
                {searchParams.orderBy === value &&
                  (searchParams.direction === "asc" ? (
                    <ArrowUp className="inline pl-1" />
                  ) : (
                    <ArrowDown className="inline pl-1" />
                  ))}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets?.map(({ id, title, status, createdAt, priority }) => (
            <TableRow key={id}>
              <TableCell>
                <Link href={`/tickets/${id}`}>{title}</Link>
              </TableCell>
              <TableCell>
                <TicketStatusBadge status={status} />
              </TableCell>
              <TableCell>
                <TicketPriority priority={priority} />
              </TableCell>
              <TableCell>{formatDate(createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketsDataTable;
