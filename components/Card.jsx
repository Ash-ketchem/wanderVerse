import Image from "next/image";
import Tour from "@/public/tour.jpg";
// import BookModal from "./BookModal";

const Card = ({ height, width, styles, data }) => {
  const { _id, title, description, price, availableDates, image: src } = data;

  return (
    <div
      className={`card card-compact bg-base-300 shadow-xl ${height} ${width} ${styles} gap-1 leading-4 tracking-tight lg:min-w-60 lg:max-w-72 h-96 w-72 pb-4`}
    >
      <figure className="h-1/3">
        <Image
          width={0}
          height={0}
          src={src || Tour}
          className="h-full w-full object-cover"
          alt="package"
          placeholder={"blur"}
          blurDataURL={"../public/tour.jpg"}
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title capitalize flex-1 text-primary w-3/4">
          {title}

          {/* <div className="badge badge-accent badge-sm lowercase border-4 flex-0">
            NEW
          </div> */}
        </h2>
        <p className="text-sm truncate font-semibold">{description}</p>
        <div className="flex gap-1 flex-col justify-around items-start">
          <p className="text-xs font-thin capitalize">Available dates</p>
          <div className="flex gap-2 text-sm flex-wrap">
            {availableDates.map((date, i) => (
              <p key={i}>{new Date(date).toLocaleDateString()}</p>
            ))}
          </div>
        </div>
        <div className="card-actions justify-start">
          <div className="badge badge-outline text-xs">Travel</div>
          <div className="badge badge-outline text-xs">Friendly</div>
          <div className="badge badge-primary text-sm tracking-wide ml-auto p-2">
            ${price}
          </div>
          {/* <BookModal packageId={_id.toString()} /> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
