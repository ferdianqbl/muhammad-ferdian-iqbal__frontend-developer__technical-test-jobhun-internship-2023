import Image from "next/image";
import Link from "next/link";

interface CardProps {
  movie: any;
}

export default function Card({ movie }: CardProps) {
  const colors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return (
    <div className="relative rounded-md overflow-hidden card transition duration-500">
      <Link key={movie.show.id} href={`/detail/${movie.show.id}`}>
        <div className="relative overflow-hidden w-full h-full poster before:bottom-[-100px] sm:before:bottom-[-180px]">
          <Image
            src={movie.show.image.original}
            width={300}
            height={400}
            alt="movie-img"
            priority
            className="h-full w-full object-cover object-center transition duration-500 ease-in-out"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 transition duration-500 z-10 details p-4 flex flex-col gap-2">
          <h1 className="text-slate-200 font-semibold">{movie.show.name}</h1>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {movie.show.genres.map((genre: string) => (
                <span
                  key={genre}
                  className={`
                  ${colors[Math.floor(Math.random() * colors.length)]} 
                  text-xs text-slate-200 px-2 py-1 rounded-md
                  `}
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex items-center">
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
                {movie.show.rating.average ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
