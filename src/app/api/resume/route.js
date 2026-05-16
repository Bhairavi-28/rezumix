import { NextResponse } from "next/server";
import { connectDB } from "@/db/connectDB";
import Resume from "@/models/resume.model";

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get data from frontend
    const body = await req.json();

    // Save resume in database
    const resume = await Resume.create(body);

    return NextResponse.json({
      success: true,
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}