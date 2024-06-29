import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { Role } from "@prisma/client";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
  requiredRole: Role;
}

const RoleGuard = async ({ children, requiredRole }: Props) => {
  const session = await getServerSession(options);

  if (session?.user.role !== requiredRole) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default RoleGuard;
