"use client";

import { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

type TicketFormData = z.infer<typeof ticketSchema>;

const TicketForm: FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: TicketFormData) => {
    try {
      await axios.post("/api/tickets", values);

      router.push("/tickets");
      router.refresh();
    } catch (e) {
      setError("Unknown error occurred");
    }
  };

  return (
    <Form {...form}>
      <form
        className="rounded-md border w-full p-4 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Title</FormLabel>
              <FormControl>
                <Input placeholder="Ticket Title..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
          name="description"
        />
        <div className="flex w-full space-x-4">
          <FormField
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={onChange} value={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="STARTED">Started</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            name="status"
          />
          <FormField
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={onChange} value={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            name="status"
          />
        </div>
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TicketForm;
