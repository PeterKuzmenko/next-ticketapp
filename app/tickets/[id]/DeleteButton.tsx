"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: number;
}

const TicketDeleteButton = ({ id }: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTicket = async () => {
    try {
      setError("");
      setIsDeleting(true);
      await axios.delete(`/api/tickets/${id}`);

      router.push("/tickets");
      router.refresh();
    } catch (e) {
      setIsDeleting(false);
      setError("Unknown error occurred");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isDeleting}
        className={buttonVariants({ variant: "destructive" })}
      >
        Delete ticket
      </AlertDialogTrigger>
      {error && <p className="text-destructive">{error}</p>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={isDeleting}
            onClick={deleteTicket}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TicketDeleteButton;
