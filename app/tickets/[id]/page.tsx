import prisma from "@/prisma/db";
import TicketDetails from "@/app/tickets/[id]/TicketDetails";

interface Props {
  params: { id: string };
}

const ViewTicket = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
  const users = await prisma.user.findMany({
    select: { id: true, name: true, username: true, role: true },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }

  return <TicketDetails ticket={ticket} users={users} />;
};

export default ViewTicket;
