import { tourPackages } from "../../../_constants/mockPackages";
import { client } from "../../../lib/monogoClient";
export async function GET(req) {
  try {
    await client.connect();

    const database = client.db("tours");

    const collection = database.collection("packages");

    const alldata = await collection.insertMany(tourPackages);

    return new Response("ok");
  } catch (error) {
    console.log(error);
  }
}
