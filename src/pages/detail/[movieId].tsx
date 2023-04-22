import Image from "next/image";

export default function Detail({ movie }: any) {
  // console.log(movie);
  return (
    <div className="flex flex-row gap-10 max-w-screen-lg m-auto py-16">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={movie.image.original}
          width={300}
          height={400}
          alt="movie-img"
          priority
          className="rounded-xl object-cover object-center transition duration-500 ease-in-out w-full"
        />
        <div className="flex flex-row gap-1 mt-4">
          {movie.genres.map((genre: string) => (
            <span
              key={genre}
              className="text-xs text-slate-200 bg-slate-600 px-2 py-1 rounded-md"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-bold text-6xl text-white">
          {movie.name}
          <span className="ms-4 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-star-fill text-yellow-300 me-1"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span className="text-xs text-slate-200">
              {movie.rating.average ?? "N/A"}
            </span>
          </span>
        </h1>

        <table>
          <tbody>
            <tr>
              <td className="text-white font-medium w-1/4">Language</td>

              <td className="text-white w-full">: {movie.language}</td>
            </tr>
            <tr>
              <td className="text-white w-1/4 font-medium">Premiered</td>

              <td className="text-white w-full">
                : {movie.premiered.split("-").reverse().join("-")}
              </td>
            </tr>
            {movie.ended && (
              <tr>
                <td className="text-white w-1/4 font-medium">Ended</td>
                <td className="text-white w-full">
                  : {movie.ended?.split("-").reverse().join("-")}
                </td>
              </tr>
            )}
            {movie.schedule.days.length > 0 && movie.schedule.time && (
              <tr>
                <td className="text-white w-1/4 font-medium">Schedule</td>

                <td className="text-white w-full">
                  : {movie.schedule.days.map((item: any) => item)} at{" "}
                  {movie.schedule.time}
                </td>
              </tr>
            )}
            <tr>
              <td className="text-white w-1/4 font-medium">Status</td>

              <td className={`text-white w-full`}>
                :{" "}
                <span
                  className={` px-2 rounded-xl pb-1 ${
                    movie.status === "Ended" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {movie.status}
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-white w-full font-medium" colSpan={2}>
                Summary
                <br />
                <span className="font-normal">
                  {movie.summary.replace(/<\/?[^>]+(>|$)/g, "")}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://api.tvmaze.com/search/shows?q=girls");
  const data = await res.json();
  const paths = data.map((item: any) => ({
    params: {
      movieId: item.show.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

interface GetStaticProps {
  params: {
    movieId: string;
  };
}

export async function getStaticProps({ params }: GetStaticProps) {
  const { movieId } = params;
  const result = await fetch(`http://api.tvmaze.com/shows/${movieId}`);
  const data = await result.json();
  return {
    props: {
      movie: data,
    },
  };
}
