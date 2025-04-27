import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "uploads", file.name);
  await writeFile(filePath, buffer);

  const newInvoice = await prisma.invoice.create({
    data: {
      fileName: file.name,
    },
  });

  return NextResponse.json({ success: true, invoice: newInvoice });
}
