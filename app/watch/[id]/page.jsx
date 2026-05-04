                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       "use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Watch() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [driveId, setDriveId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false); // Player holati

  const API = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [m, c, v] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}`).then((r) => r.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API}`).then((r) => r.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API}`).then((r) => r.json()),
        ]);
        setMovie(m);
        setCast((c.cast || []).slice(0, 6));
        const t = (v.results || []).find((x) => x.type === "Trailer");
        if (t) setTrailer(t.key);

        const { data } = await supabase.from("movies").select("drive_id").eq("tmdb_id", id).single();
        if (data) setDriveId(data.drive_id);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchAll();
  }, [id, API]);

  if (!movie) return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const firstTwo = movie.title ? movie.title.split(" ").slice(0, 2).join(" ") : "";
  const rest = movie.title ? movie.title.split(" ").slice(2).join(" ") : "";

  return (
    <div className="text-[var(--white)] max-w-5xl mx-auto px-4">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className="absolute inset-0 w-full h-full brightness-20 object-cover"
        alt=""
      />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent z-[1]" />

      <div className="relative min-h-[100svh] flex items-center py-16">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center w-full">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-44 sm:w-56 md:w-72" />
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl">
              <span className="text-white">{firstTwo}</span> <span className="text-[var(--lime)]">{rest}</span>
            </h1>
            <p className="max-w-lg text-sm sm:text-base leading-relaxed">{movie.overview}</p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              {driveId && (
                <button
                  onClick={() => setShowPlayer(true)}
                  className="btn bg-[var(--dark96)] py-2 px-5 text-sm sm:text-base flex items-center gap-2"
                >
                  <img src="/play-icon.svg" className="w-4 h-4" alt="Play" /> WATCH MOVIE
                </button>
              )}
              {trailer && (
                <button onClick={() => setOpenTrailer(true)} className="btn py-2 px-5 text-sm sm:text-base flex items-center gap-2">
                  <img src="/play-icon.svg" className="w-4 h-4" alt="Play" /> TRAILER
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 1-rasmdagi ko'rinishni beruvchi qism */}
      {showPlayer && driveId && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="flex justify-between items-center p-4 bg-black/50">
            <span className="text-sm font-medium truncate pr-4">{movie.title}</span>
            <button onClick={() => setShowPlayer(false)} className="text-2xl">&times;</button>
          </div>
          <div className="flex-grow">
            <iframe
              src={`https://drive.google.com/file/d/${driveId}/preview`}
              className="w-full h-full border-none"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Cast va boshqa elementlar */}
      <div className="mt-12 mb-10 relative z-10">
        <h2 className="text-xl mb-6">Cast</h2>
        <div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-5">
          {cast.map((a) => (
            <div key={a.id}>
              {a.profile_path && <img src={`https://image.tmdb.org/t/p/w300${a.profile_path}`} alt={a.name} className="w-full rounded" />}
              <p className="text-sm mt-2">{a.name}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Trailer modal */}
      {openTrailer && (
        <div onClick={() => setOpenTrailer(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <iframe src={`https://www.youtube.com/embed/${trailer}`} className="w-full max-w-[900px] aspect-video" allowFullScreen />
        </div>
      )}
    </div>
  );
}
                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
