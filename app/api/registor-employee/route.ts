import { empCreated, empNotCreated, missingFeilds } from "@/app/lib/Const";
import { prisma } from "@/app/lib/prisma";
import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createEmployeSchema } from "./schema";

export async function POST(request: NextRequest) {
  const formData = await request.json();
  console.log(formData);

  const validSchema = createEmployeSchema.safeParse(formData);

  if (!validSchema.success) {
    const formattedErrors = Object.entries(
      validSchema.error.flatten().fieldErrors
    ).map(([field, messages]) => ({
      field,
      message: messages?.join(", ") || "Invalid value",
    }));

    console.log("errors", formattedErrors);
    return NextResponse.json({
      success: false,
      msg: "Validation error",
      data: null,
      error: formattedErrors,
    });
  }
  try {
    const data = await prisma.employee.create({
      data: { ...formData },
    });
    console.log("data : ", data);
    return NextResponse.json({
      success: true,
      msg: empCreated,
      data,
    });
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json({
        success: false,
        msg: "Email already exists",
      });
    }
  }
}
