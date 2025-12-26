"use client";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AnnouncementBanner = () => {
  const [currentContent, setCurrentContent] = useState<"announcement" | "register">("announcement");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContent((prev) => (prev === "announcement" ? "register" : "announcement"));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground py-3 px-1 text-center font-semibold overflow-hidden h-[6vh]">
      <div
        key={currentContent}
        className={`transition-transform duration-700 ease-in-out ${currentContent === "announcement"
          ? "animate-slide-down"
          : "animate-slide-up"
          }`}
      >
        {currentContent === "announcement" ? (
          <p className="text-sm md:text-base">
            INDIA'S Most Comprehensive 3D Printing WORKSHOP
          </p>
        ) : (
          <div className="text-sm md:text-base cursor-pointer" onClick={() => navigate("/register")}>
            Only a Few Seats Left! — <span className="underline font-bold"> Register Now @ ₹199/- </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
