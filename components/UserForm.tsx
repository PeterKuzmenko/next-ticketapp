"use client";

import { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import { Role, Ticket, User } from "@prisma/client";
import { userSchema } from "@/ValidationSchemas/users";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

const UserForm: FC<Props> = ({ user }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      role: user?.role || "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors: validationErrors },
  } = form;

  const onSubmit = async (values: UserFormData) => {
    try {
      if (user) {
        await axios.patch(`/api/users/${user.id}`, values);
      } else {
        await axios.post("/api/users", values);
      }

      router.push("/users");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter User's Full Name..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Username..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  required={!user}
                  placeholder="Enter Password..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={onChange} value={value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Role..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Role).map((x) => (
                    <SelectItem
                      key={x}
                      value={x}
                    >{`${x[0]}${x.slice(1, x.length).toLowerCase()}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {user ? "Update User" : "Create User"}
        </Button>
      </form>
      {error && <p className="text-destructive">{error}</p>}
      {Object.values(validationErrors).map(({ message }) => (
        <p key={message} className="text-destructive">
          {message}
        </p>
      ))}
    </Form>
  );
};

export default UserForm;
