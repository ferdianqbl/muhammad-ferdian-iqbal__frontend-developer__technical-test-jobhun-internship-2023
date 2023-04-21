import Image from "next/image";

interface CardProps {
  movie: any;
}

export default function Card({ movie }: CardProps) {
  return (
    <div className="relative rounded-md overflow-hidden card transition duration-500">
      <div className="relative overflow-hidden w-full h-full poster">
        <Image
          src={movie.show.image.original}
          width={300}
          height={400}
          alt="movie-img"
          priority
          className="h-full w-full object-cover object-center transition duration-500 ease-in-out"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 transition duration-500 z-10 details p-4">
        <h1 className="text-slate-200">{movie.show.name}</h1>
      </div>
    </div>
  );
}
