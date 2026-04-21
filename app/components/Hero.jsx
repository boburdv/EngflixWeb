"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MOVIES = [
  { id: 1087192, video: "/hero-video/your-dragon.mp4" },
  { id: 516729, video: "/hero-video/paddington-in-peru.mp4" },
  { id: 1011985, video: "/hero-video/kung-fu-panda-4.mp4" },
];

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    Promise.all(MOVIES.map(({ id }) => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`).then((res) => res.json()))).then(setMovies);
  }, [API_KEY]);

  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => setCurrent((c) => (c + 1) % movies.length), 43000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length) {
    return <section className="h-[520px] sm:h-[600px] lg:h-[650px] w-full bg-gray-800 animate-pulse" />;
  }

  const movie = movies[current];
  const videoSrc = MOVIES[current].video;

  const words = (movie.title || "").split(" ");
  const firstTwo = words.slice(0, 2).join(" ");
  const rest = words.slice(2).join(" ");

  return (
    <section className="relative w-full overflow-hidden h-[520px] sm:h-[600px] lg:h-[650px]">
      <video ref={videoRef} src={videoSrc} autoPlay loop muted={muted} playsInline className="absolute inset-0 w-full h-full brightness-70 object-cover scale-134 lg:scale-115" />

      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[34%] sm:h-[30%] bg-gradient-to-t from-black to-transparent z-[1]" />

      <div className="relative z-10 h-full flex items-end sm:items-center pb-14 sm:pb-0">
        <div key={current} className="max-w-7xl mx-auto w-full px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold animate-slide-up d200 leading-tight">
            <span className="text-[var(--white)]">{firstTwo}</span> <span className="text-[var(--lime)]">{rest}</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[var(--white)] max-w-xl line-clamp-3 animate-slide-up d350">{movie.overview}</p>

          <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[var(--white)] animate-slide-up d500 text-xs sm:text-sm">
            <img src="/movie.svg" alt="movie icon" className="sm:h-auto h-5" />
            <img src="/hd.svg" alt="HD icon" />
            <span className="truncate max-w-[70vw] sm:max-w-none">
              {movie.genres
                ?.slice(0, 2)
                .map((g) => g.name)
                .join(", ")}
            </span>
            <span className="opacity-90">{movie.release_date?.slice(0, 4)}</span>
          </div>

          <div className="mt-6 sm:mt-10 flex items-center justify-between max-w-[340px] sm:max-w-6xl animate-slide-up d500">
            <Link href={`/watch/${movie.id}`}>
              <button className="btn bg-[var(--dark96)] py-2 px-5 sm:py-2 sm:px-5 text-sm sm:text-base gap-2">
                <img src="/play-icon.svg" alt="Play" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                PLAY NOW
              </button>
            </Link>

            <button
              onClick={() => {
                if (!videoRef.current) return;
                videoRef.current.muted = !videoRef.current.muted;
                setMuted(videoRef.current.muted);
              }}
              className="btn bg-[var(--dark96)] p-3"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              <img src={muted ? "/mute.png" : "/volume.png"} alt={muted ? "mute" : "volume"} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
