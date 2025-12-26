import { Pause, Play, Star } from "lucide-react";
import WorkshopDetailsBox from "./WorkshopDetailsBox";
import { useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playButtonVisible, setPlayButtonVisible] = useState(true);

  const handlePlayPause = () => {
    if (videoRef?.current?.muted != null) {
      if (isPlaying) {
        videoRef.current?.pause();
        setPlayButtonVisible(true);
      } else {
        videoRef.current?.play();
        // setPlayButtonVisible(false);
        handlePlayButtonInvisible();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const handlePlayButtonInvisible = () => {
    setTimeout(() => {
      setPlayButtonVisible(false);
    }, 1000);
  }

  return (
    <section className="container mx-auto px-4 py-7 animate-fade-in" style={{ background: "url('/bg.jpg')" }}>
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
          <span className="text-primary px-2 rounded-lg inline-block transform hover:scale-105 transition-transform duration-300">
            Learn the Strategies
          </span>
          <br />
          Behind My Successful
          <br />
          <span className="text-3xl font-extrabold md:text-5xl lg:text-6xl">
            3D Printing Business
          </span>
          <br />
          In My <span className="underline">Live Workshop</span>
        </h1>
        <p className="text-md md:text-xl font-black">
          (No Prior Knowledge or Technical Experience Required)
        </p>

        <div className="flex items-center justify-center p-4 mb-2">
          <div className="relative bg-green-50 rounded-3xl px-8 py-2" style={{ border: '3px dotted #10b981' }}>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs md:text-sm font-extrabold text-green-600">
                Rating: 4.9 | 12,478 Reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        {/* Video Section */}
        <div className="relative group cursor-pointer" onClick={handlePlayPause}>
          <div className="absolute -inset-1 blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-card overflow-hidden shadow-2xl border-2 border-primary aspect-video" style={{ borderWidth: '5px', borderRadius: '7px' }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/lMuZKAh_5Vg?controls=0&modestbranding=1&rel=0&showinfo=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Workshop Details */}
        <div className="lg:sticky lg:top-8">
          <WorkshopDetailsBox />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
