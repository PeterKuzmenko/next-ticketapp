import { Ticket, User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReactMarkDown from "react-markdown";
import TicketDeleteButton from "@/app/tickets/[id]/DeleteButton";
import AssignTicket from "@/components/AssignTicket";
import { ClientUser } from "@/lib/types";

interface Props {
  ticket: Ticket;
  users: ClientUser[];
}

const TicketDetails = ({ ticket, users }: Props) => {
  const { id, status, createdAt, priority, title, description, updatedAt } =
    ticket;

  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatusBadge status={status} />
            <TicketPriority priority={priority} />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Created: {formatDate(createdAt)}</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkDown>{description}</ReactMarkDown>
        </CardContent>
        <CardFooter>Updated: {formatDate(updatedAt)}</CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <AssignTicket ticket={ticket} users={users} />
        <Link href={`/tickets/edit/${id}`} className={buttonVariants()}>
          Edit ticket
        </Link>
        <TicketDeleteButton id={id} />
      </div>
    </div>
  );
};

export default TicketDetails;
