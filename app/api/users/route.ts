import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/ValidationSchemas/users";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { Role } from "@prisma/client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 403 });
  }

  if (session.user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: "Username already exists" },
      { status: 409 },
    );
  }

  body.password = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
