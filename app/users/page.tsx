import UserForm from "@/components/UserForm";
import UsersDataTable from "@/app/users/DataTable";
import prisma from "@/prisma/db";

const Users = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, username: true, role: true },
  });

  return (
    <div className="flex flex-col gap-5">
      <UserForm />
      <UsersDataTable users={users} />
    </div>
  );
};

export default Users;
