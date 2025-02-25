import prisma from "@/prisma/db";
import UserForm from "@/components/UserForm";

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
    select: { id: true, name: true, username: true, role: true },
  });

  if (!user) {
    return <p className="text-destructive">User not found!</p>;
  }

  return <UserForm user={user} />;
};

export default EditUser;
