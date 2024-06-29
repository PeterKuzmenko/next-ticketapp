import RoleGuard from "@/components/RoleGuard";
import { Role } from "@prisma/client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => (
  <RoleGuard requiredRole={Role.ADMIN}>{children}</RoleGuard>
);

export default Layout;
