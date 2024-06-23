import { Badge } from "@/components/ui/badge";
import { Status } from "@prisma/client";
import { FC } from "react";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
  [Status.CLOSED]: { label: "Closed", color: "bg-green-400" },
  [Status.OPEN]: { label: "Open", color: "bg-red-400" },
  [Status.STARTED]: { label: "Started", color: "bg-blue-400" },
};

const TicketStatusBadge: FC<Props> = ({ status }) => {
  return (
    <Badge
      className={`${statusMap[status].color} hover:${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default TicketStatusBadge;
