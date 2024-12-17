import { ObjectId } from "mongodb";
import { client } from "@/lib/monogoClient";
import PrintPdf from "@/components/printPdf";

const page = async ({ params }) => {
  const { id } = await params;

  let data = null;
  try {
    await client.connect();

    const database = client.db("tours");

    const bookings = database.collection("bookings");
    const packages = database.collection("packages");

    const booking = await bookings.findOne({
      _id: new ObjectId(id),
    });

    if (booking?._id) {
      const packageDetails = await packages.findOne({
        _id: new ObjectId(booking.packageId),
      });

      if (packageDetails?._id) {
        data = { ...booking, ...packageDetails };
      }
    }

    if (!data?._id) {
      throw new Error("No data");
    }
  } catch (err) {
    console.log(err);
    return <>404</>;
  }

  return (
    <>
      <div
        className="max-w-3xl mx-auto p-6  shadow-md border rounded-md"
        id="invoice"
      >
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wide ">
            Invoice
          </h1>
          <p className="text-sm text-gray-500">
            Invoice Date: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Customer Info */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold ">Customer Details</h2>
          <div className="text-foreground mt-2">
            <p>
              <span className="font-medium">Name:</span> {data.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {data.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {data.phone}
            </p>
          </div>
        </section>

        {/* Package Info */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold ">Package Details</h2>
          <div className="mt-2">
            <img
              src={data.image}
              alt={data.title}
              className="w-full max-h-64 object-cover rounded-md mb-4 border"
            />
            <p className="text-lg font-medium text-neutral-content">
              {data.title}
            </p>
            <p className="text-foreground">{data.description}</p>
            <p className="mt-2">
              <span className="font-medium ">Price:</span>{" "}
              <span className="text-neutral-content">$ {data.price}</span>
            </p>
            <p>
              <span className="font-medium ">Available Dates:</span>
            </p>
            <ul className="list-disc list-inside text-foreground">
              {data.availableDates.map((date, index) => (
                <li key={index}>{new Date(date).toLocaleDateString()}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Booking Info */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold ">Booking Details</h2>
          <div className="text-foreground mt-2">
            <p>
              <span className="font-medium">Package ID:</span> {data.packageId}
            </p>
            <p>
              <span className="font-medium">Number of Travelers:</span>{" "}
              {data.count}
            </p>
            <p>
              <span className="font-medium">Total Price:</span>{" "}
              {parseInt(data.count) * parseFloat(data.price)}
            </p>
            {data.extra && (
              <p>
                <span className="font-medium">Additional Info:</span>{" "}
                {data.extra}
              </p>
            )}
          </div>
          <div className="mt-2">
            <PrintPdf id="invoice" />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8 border-t pt-4 text-gray-500 text-sm">
          Thank you for booking with us! For any inquiries, please contact us at{" "}
          <a
            href="mailto:support@tours.com"
            className="text-blue-500 hover:underline"
          >
            support@tours.com
          </a>
          .
        </footer>
      </div>
    </>
  );
};

export default page;
