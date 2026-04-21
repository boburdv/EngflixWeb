import React from "react";

export default function Footer() {
  return (
    <div
      className="max-w-5xl mx-auto w-full flex flex-col items-center text-center
                mt-14 sm:mt-20 mb-5 gap-4 sm:gap-6 px-4"
    >
      <nav>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:text-base uppercase">
          <li>
            <a href="/" className="text-[var(--white)] hover:text-[var(--lime)]">
              Home
            </a>
          </li>
          <li className="hidden sm:block text-[var(--second-dark)]">|</li>
          <li>
            <a href="/movies" className="text-[var(--white)] hover:text-[var(--lime)]">
              Movies
            </a>
          </li>
          <li className="hidden sm:block text-[var(--second-dark)]">|</li>
          <li>
            <a href="/about" className="text-[var(--white)] hover:text-[var(--lime)]">
              Order
            </a>
          </li>
          <li className="hidden sm:block text-[var(--second-dark)]">|</li>
          <li>
            <a href="/contact" className="text-[var(--white)] hover:text-[var(--lime)]">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <p className="max-w-3xl text-xs sm:text-sm text-[var(--second-dark)]">
        All films are posted for display purposes only and the copyrights belong to their respective owners. At the request of the rights holders, this content will be removed from the site.
      </p>

      <p className="text-xs sm:text-sm text-[var(--second-dark)]">© {new Date().getFullYear()} All rights reserved.</p>
    </div>
  );
}
