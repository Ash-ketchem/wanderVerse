import { client } from "@/lib/monogoClient";
import { NextResponse } from "next/server";
import { validateData } from "@/utils/utils";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    await client.connect();

    const database = client.db("tours");

    const collection = database.collection("packages");

    const alldata = await collection.find({}).toArray();

    return NextResponse.json(
      {
        data: alldata,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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

export async function POST(request) {
  try {
    await client.connect();

    // Parse FormData
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const validationResult = validateData(data);

    if (!validationResult.isValid) {
      throw new Error("Validation failed:");
    }

    const database = client.db("tours");

    const tourPackages = database.collection("packages");

    const tour = await tourPackages.findOne({
      _id: new ObjectId(data.packageId),
    });

    if (!tour?._id) {
      throw new Error("Invalid tour package");
    }

    const bookings = database.collection("bookings");

    const res = await bookings.insertOne(data);

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
