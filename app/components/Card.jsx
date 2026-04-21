"use client";
import Link from "next/link";
import { useState } from "react";

export default function Card({ movie }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link href={`/watch/${movie.tmdb_id || movie.id}`}>
      <div className="cursor-pointer group mb-4">
        <div className="overflow-hidden relative shadow-lg shadow-black/50 border border-white/10">
          {" "}
          {!imgLoaded && (
            <div className="bg-gray-800 w-full h-56 sm:h-64 md:h-72 animate-pulse" />
          )}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
            className={`w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-600 group-hover:scale-103 ${imgLoaded ? "block" : "hidden"}`}
          />
        </div>

        <div className="mt-4 sm:mt-6 md:mt-7 flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div className="flex justify-between items-start gap-2">
            <h5 className="line-clamp-1 text-white text-sm sm:text-base">
              {movie.title}
            </h5>
            <span className="text-[var(--lime)] text-xs sm:text-sm shrink-0">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <img src="/hd.svg" alt="HD" className="w-5 sm:w-7" />

            <div className="text-[10px] sm:text-[12px] flex gap-3 sm:gap-5">
              <p className="flex items-center gap-1">
                <img
                  src="/time-icon.svg"
                  width={14}
                  className="sm:w-[15px]"
                  alt="Time"
                />
                {movie.runtime
                  ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                  : "-"}
              </p>

              <p className="flex items-center gap-1">
                <img
                  src="/star.svg"
                  width={12}
                  className="sm:w-[13px]"
                  alt="Rating"
                />
                {(movie.vote_average || 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
