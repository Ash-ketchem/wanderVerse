import { client } from "@/lib/monogoClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = (await params).id;

    await client.connect();

    const database = client.db("tours");

    const collection = database.collection("packages");

    const data = await collection.findOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json(
      {
        data: data,
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
