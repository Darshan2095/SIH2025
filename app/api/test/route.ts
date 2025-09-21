import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export async function GET() {
  try {
    await connectDB();

    const user = new User({
      name: "Darshan",
      email: "darshan@example.com",
    });

    await user.save();

    return NextResponse.json({ message: "MongoDB Connected!", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
