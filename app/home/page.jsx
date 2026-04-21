"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import Hero from "../components/Hero";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.slice(0, 10));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero />

      <div className="text-white max-w-7xl mx-auto px-4 pb-10">
        <p className="text-[var(--lime)] text-xs sm:text-sm mt-10">
          ONLINE STREAMING
        </p>
        <h1 className="text-2xl lg:text-3xl mt-4 mb-10">Stream the Best</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-10">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
            : movies.map((movie) => (
                <Card key={movie.tmdb_id || movie.id} movie={movie} />
              ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/movies">
            <button className="btn py-2 px-5 sm:py-2 sm:px-5 text-sm sm:text-base">
              ALL MOVIES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
