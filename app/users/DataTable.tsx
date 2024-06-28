import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import Link from "next/link";

interface Props {
  users: Omit<User, "password">[];
}

const UsersDataTable = ({ users }: Props) => {
  return (
    <div className="w-full rounded-md sm:border">
      <Table>
        <TableHeader>
          <TableRow className="font-medium bg-secondary hover:bg-secondary">
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map(({ id, username, name, role }) => (
            <TableRow key={id} data-href="/">
              <TableCell>
                <Link href={`/users/${id}`}>{name}</Link>
              </TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>{role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersDataTable;
