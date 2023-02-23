import BaseLayout from "@/components/layouts/baseLayout";

export default function Home() {
  return (
    <>
      <BaseLayout>
        <div className="h-screen flex flex-col justify-center items-center font-bold text-2xl">
          <picture>
            <img
              className="m-0 h-48 rounded-2xl object-cover w-full"
              src="/zoro/zorop.png"
              alt={"zoro"}
            />
          </picture>
          <h1 className="md:text-9xl xs:text-7xl">
            zoro.<span className="text text-green-400">cut</span>
          </h1>
          <p className="mb-10">URL Shortener 🔗</p>
          <form className="">
            <div className="flex md:flex-row sm:flex-col xs:flex-col">
              <div className="group relative w-72">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-green-500"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
                <input
                  className="focus:ring-2 focus:ring-green-500 focus:outline-none appearance-none w-full text-sm leading-6 text-white-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                  type="text"
                  aria-label="Url"
                  placeholder="Enter an URL"
                />
              </div>

              <button className="w-32 xs:mt-5 xs:ml-0 justify-evenly md:mt-0 md:ml-5 hover:bg-green-600 group flex items-center rounded-md bg-green-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  aria-hidden="true"
                >
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
                New URL
              </button>
            </div>
          </form>
        </div>
      </BaseLayout>
    </>
  );
}
