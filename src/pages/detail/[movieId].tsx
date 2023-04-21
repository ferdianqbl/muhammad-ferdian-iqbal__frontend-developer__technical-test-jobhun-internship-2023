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
        <h1 className="font-bold text-6xl text-white">{movie.name}</h1>

        <table>
          <tr>
            <td className="text-white font-semibold w-1/4">Language</td>
            <td className="text-white font-semibold w-1/4">:</td>
            <td className="text-white font-semibold w-1/4">{movie.language}</td>
          </tr>
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
