import { client } from "@/lib/monogoClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { validatePackageData } from "../../../../../utils/utils";

export async function PUT(request, { params }) {
  try {
    const id = (await params).id;

    const data = await request.json();

    const validationResult = validatePackageData(data);

    if (!validationResult.isValid) {
      throw new Error("Validation failed:");
    }

    await client.connect();

    const database = client.db("tours");

    const collection = database.collection("packages");

    const resp = await collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: data,
      }
    );

    if (resp?.modifiedCount != 1) {
      throw new Error("Updation Failed");
    }

    return new Response("ok", {
      status: 201,
    });
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

export async function DELETE(request, { params }) {
  try {
    const id = (await params).id;

    await client.connect();

    const database = client.db("tours");

    const collection = database.collection("packages");

    const res = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (res.deletedCount != 1) {
      throw new Error("Deletion Failed");
    }

    return NextResponse.json(
      {},
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
