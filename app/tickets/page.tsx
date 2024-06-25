import prisma from "@/prisma/db";
import DataTable from "@/app/tickets/DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/lib/contsants";
import StatusFilter from "@/components/StatusFilter";
import { Status, Ticket } from "@prisma/client";

export interface SearchParams {
  page: string;
  status: string;
  orderBy: keyof Ticket;
  direction: "asc" | "desc";
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;

  const statuses = Object.values(Status);
  const status = statuses.find((x) => x === searchParams.status);

  const orderBy = searchParams.orderBy || "createdAt";
  const direction = searchParams.direction || "desc";
  const where = status ? { status } : { NOT: [{ status: "CLOSED" as Status }] };

  const ticketCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    take: PAGE_SIZE,
    skip: PAGE_SIZE * (page - 1),
    where,
    orderBy: { [orderBy]: direction },
  });

  return (
    <div>
      <div className="flex gap-3">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        pageSize={PAGE_SIZE}
        itemsCount={ticketCount}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
