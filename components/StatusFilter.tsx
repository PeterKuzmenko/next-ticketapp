"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses: { label: string; value?: string }[] = [
  { label: "Open / Started" },
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
];

const StatusFilter = () => {
  const router = useRouter();
  const params = useSearchParams();

  const setStatusFilter = (status: string) => {
    const newParams = new URLSearchParams();

    newParams.set("status", status);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <Select
      defaultValue={params.get("status") || ""}
      onValueChange={setStatusFilter}
    >
      <SelectTrigger className="w-max gap-2">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map(({ label, value }) => (
            <SelectItem key={value || "0"} value={value || "0"}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
