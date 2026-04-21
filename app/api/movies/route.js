import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Supabase'dan barcha kinolarni olish
    const { data: dbMovies, error } = await supabase
      .from("movies")
      .select("tmdb_id");

    if (error) throw error;

    // 2. Har bir kino uchun TMDB'dan ma'lumot olish
    const movies = await Promise.all(
      dbMovies.map(async (movie) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        );
        return res.json();
      }),
    );

    return NextResponse.json(movies);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
