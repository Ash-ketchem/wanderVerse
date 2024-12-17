import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="mockup-browser bg-base-300 border w-2/3">
        <div className="mockup-browser-toolbar">
          <div className="input">https://wanderverse.com</div>
        </div>
        <div className="bg-base-200 flex justify-center px-4 py-16 font-bold tracking-wide leading-relaxed text-xl  flex-col gap-2 items-center">
          <p className="text-primary text-2xl">welcome to WanderVerse</p>
          <p>
            <Link href="/packages/" className="underline text-md">
              Tour Packages
            </Link>
          </p>
          <p>
            <Link href="/admin/" className="underline text-md">
              Admin Panel
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
