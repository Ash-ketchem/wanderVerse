import { client } from "@/lib/monogoClient";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { validatePackageData } from "../../../../utils/utils";

export async function POST(request) {
  try {
    await client.connect();

    // Parse FormData
    const data = await request.json();

    const validationResult = validatePackageData(data);

    if (!validationResult.isValid) {
      throw new Error("Validation failed:");
    }

    const database = client.db("tours");

    const tourPackages = database.collection("packages");

    const res = await tourPackages.insertOne(data);

    if (!res?.insertedId) {
      throw new Error("Insertion failed");
    }

    return NextResponse.json(
      {
        _id: res.insertedId,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "error",
      },
      {
        status: 400,
      }
    );
  } finally {
    await client.close();
  }
}
