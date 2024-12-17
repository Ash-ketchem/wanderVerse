import { client } from "@/lib/monogoClient";
import LoginForm from "../../components/admin/LoginForm";
const page = async () => {
  let alldata = [];

  try {
    await client.connect();

    const database = client.db("tours");

    const collection = database.collection("packages");

    alldata = await collection.find({}).toArray();
  } catch (err) {
    //redirect
    console.log(err);
    return <div>404</div>;
  }
  return (
    <div className="lg:px-8 p-2">
      <LoginForm
        alldata={alldata.map((data) => {
          return {
            ...data,
            _id: data._id.toString(),
          };
        })}
      />
    </div>
  );
};

export default page;
