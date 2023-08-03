import { sendMail } from "@/service/mailService";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const parseReq = await req.json();
  const { subject, email, message } = parseReq;
  try {
    await sendMail(subject, email, message);
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong" });
  }
  return NextResponse.json({ message: "Success" });
}
