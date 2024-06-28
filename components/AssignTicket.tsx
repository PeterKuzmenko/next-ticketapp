"use client";

import { Ticket } from "@prisma/client";
import { ClientUser } from "@/lib/types";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

interface Props {
  ticket: Ticket;
  users: ClientUser[];
}

const AssignTicket = ({ ticket, users }: Props) => {
  const [value, setValue] = useState(
    ticket.assignedToUserId?.toString() || "0",
  );
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState("");

  const assignTicket = async (userId: string) => {
    setError("");
    setIsAssigning(true);

    await axios
      .patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === "0" ? null : Number(userId),
      })
      .then(({ data }) => {
        setValue(data.assignedToUserId?.toString() || "0");
      })
      .catch((e) => {
        setError("Unable to assign ticket");
        setIsAssigning(false);
      })
      .finally(() => {
        setIsAssigning(false);
      });
  };

  return (
    <Select value={value} disabled={isAssigning} onValueChange={assignTicket}>
      <SelectTrigger>
        <SelectValue placeholder="Select User..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Unassigned</SelectItem>
        {users.map(({ id, username }) => (
          <SelectItem key={id} value={id.toString()}>
            {username}
          </SelectItem>
        ))}
      </SelectContent>
      {error && <p className="text-destructive">{error}</p>}
    </Select>
  );
};

export default AssignTicket;
