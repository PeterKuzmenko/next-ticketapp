import { Ticket } from "@prisma/client";
import { FC } from "react";
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

interface Props {
  tickets: Ticket[];
}

const DataTable: FC<Props> = ({ tickets }) => {
  return (
    <Table className="w-full mt-5 rounded-md sm:border">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Priority</TableHead>
          <TableHead>Created At</TableHead>
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
  );
};

export default DataTable;
