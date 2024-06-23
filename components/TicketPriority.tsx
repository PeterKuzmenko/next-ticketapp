import { FC } from "react";
import { Priority } from "@prisma/client";
import { FlameIcon } from "lucide-react";

interface Props {
  priority: Priority;
}

const priorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
  HIGH: { label: "High", level: 3 },
  MEDIUM: { label: "Medium", level: 2 },
  LOW: { label: "Low", level: 1 },
};

const TicketPriority: FC<Props> = ({ priority }) => {
  return (
    <div className="flex justify-center">
      {Object.values(priorityMap).map(({ level }) => (
        <FlameIcon
          key={level}
          className={
            priorityMap[priority].level <= level ? "text-red-500" : "text-muted"
          }
        />
      ))}
    </div>
  );
};

export default TicketPriority;
