import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  await prisma.todo.deleteMany();

  const newTasks = await prisma.todo.createManyAndReturn({
    data: [
      {
        description: "Buy groceries",
      },
      {
        description: "Buy a new phone",
      },
      {
        description: "Buy a new computer",
      },
      {
        description: "Buy a new car",
        completed: true,
      },
      {
        description: "Buy a new house",
      },
      {
        description: "Buy a new boat",
        completed: true,
      },
    ],
  });

  return NextResponse.json(newTasks);
}
