import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const StickyBottomBar = () => {
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 53); // 6 minutes 53 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 backdrop-blur-md border-t border-primary/20 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-50 animate-slide-in">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-left justify-between gap-4">
          <div className="flex flex-col items-left gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-bold text-primary">₹199/-</span>
              <span className="text-xl md:text-2xl line-through">₹999</span>
            </div>

            <div className="items-left gap-2">
              <div className="flex items-left gap-2">
                <p className="text-sm text-gray-600 font-medium">Offer Expires in {" "}
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
              </div>
            </div>
          </div>

          <Button onClick={() => navigate("/register")} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all text-lg py-6">
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;