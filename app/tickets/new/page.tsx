import { FC } from "react";
import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const NewTicket: FC = () => {
  return <TicketForm />;
};

export default NewTicket;
