import { ObjectId } from "mongodb";
import Image from "next/image";
import Tour from "../../../public/tour.jpg";
import { client } from "../../../lib/monogoClient";
import BookModal from "../../../components/BookModal";

const page = async ({ params }) => {
  const { id } = await params;

  let data = null;

  try {
    await client.connect();

    const database = client.db("tours");

    const collection = database.collection("packages");

    data = await collection.findOne({ _id: new ObjectId(id) });

    if (!data?._id) {
      return <>no data</>;
    }
  } catch (err) {
    //redirect
    console.log(err);
    return <div>404</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-full flex-1">
        <Image
          //   src={data.image}
          width={0}
          height={0}
          src={Tour}
          alt="banner"
          className="!h-72 w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-around items-start gap-4 p-4">
        <h3 className="text-3xl font-extrabold tracking-wider">{data.title}</h3>
        <p className="font-semibold tracking-wide leading-relaxed text-sm">
          {data.description}
        </p>
        <div className="flex gap-1 flex-col justify-around items-start">
          <p className="text-xs font-thin capitalize">Available dates</p>
          <div className="flex gap-4 text-info">
            {data.availableDates.map((date, i) => (
              <p key={i} className="font-bold text-md">
                {new Date(date).toLocaleDateString()}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="w-full flex justify-start items-center flex-wrap">
            <div className="badge badge-outline text-xs mr-1">Travel</div>
            <div className="badge badge-outline text-xs mr-4">Friendly</div>
            <div className="badge badge-primary text-sm tracking-wide p-2">
              {data.price}
            </div>
            <div className="mb-4 md:ml-4 flex-1 lg:ml-4">
              <BookModal packageId={data._id.toString()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
