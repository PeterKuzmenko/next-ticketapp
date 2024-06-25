import prisma from "@/prisma/db";
import DataTable from "@/app/tickets/DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/lib/contsants";

interface Props {
  searchParams: { page: string };
}

const Tickets = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const ticketCount = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({
    take: PAGE_SIZE,
    skip: PAGE_SIZE * (page - 1),
  });

  return (
    <div>
      <Link
        href="/tickets/new"
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
      <Pagination
        pageSize={PAGE_SIZE}
        itemsCount={ticketCount}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
