import Link from "next/link";
import { client } from "@/lib/monogoClient";
import Card from "@/components/Card";

const page = async () => {
  let packages = [];

  try {
    await client.connect();

    const database = client.db("tours");

    const collection = database.collection("packages");

    packages = await collection.find({}).toArray();
  } catch (err) {
    return <>custom 404</>;
  }

  return (
    <main className="min-h-[100vh] w-[100vw] flex flex-col gap-4 justify-center items-center  p-2">
      {/* <aside className="w-fit min-h-full border-4 hidden md:flex p-2">
        sidebar
      </aside> */}
      <h3 className="text-xl font-bold leading-relaxed tracking-wide">
        Explore Tour Packages
      </h3>
      <div className="flex lg:justify-start items-start gap-4 flex-wrap lg:w-[80%] w-full overflow-hidden justify-center ">
        {packages.map((data) => (
          <Link key={data._id} href={`/packages/${data._id}`} className="">
            <Card styles="cursor-pointer flex-1" data={data} key={data._id} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default page;
