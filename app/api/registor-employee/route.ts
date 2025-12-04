import { empCreated, empNotCreated, missingFeilds } from "@/app/lib/Const";
import { prisma } from "@/app/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, role, age, salary, email } = await request.json();
  console.log("name, role, age, salary: ", name, email, role, age, salary);

  if (!name || !role || !age || !salary || !email) {
    return NextResponse.json({
      success: false,
      msg: missingFeilds,
      data: null,
    });
  }
  try {
    const data = await prisma.employee.create({
      data: { name, age, salary, email, role },
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
