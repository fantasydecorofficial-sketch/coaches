import { Clock, Video, CalendarDaysIcon, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const getNextSunday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);

  const day = nextSunday.getDate();
  const month = nextSunday.toLocaleString("en-IN", { month: "long" });

  return `${getOrdinal(day)} ${month}`;
};

const getOrdinal = (n: number) => {
  const rem10 = n % 10;
  const rem100 = n % 100;

  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  if (rem10 === 1) return `${n}st`;
  if (rem10 === 2) return `${n}nd`;
  if (rem10 === 3) return `${n}rd`;
  return `${n}th`;
};

const WorkshopDetailsBox = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="text-xl md:text-2xl font-bold leading-snug text-gray-900 mb-6 max-w-[90%] mx-auto text-center">
          Jumpstart your 3D printing business journey with me today
        </h1>
        <div className="border-2 border-green-500 rounded-3xl p-2 bg-white shadow-sm px-4 pb-6">
          <div className="text-center -mt-6 mb-2">
            <span className="bg-white px-2 py-1 text-md font-semibold text-gray-900">
              Workshop Details
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                <CalendarDaysIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-md">Date</p>
                <p className="font-bold">{getNextSunday()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-md">Time</p>
                <p className="font-bold">10 AM - 12 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-md">Workshop</p>
                <p className="font-bold">Zoom</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                <Languages className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-md">Language</p>
                <p className="font-bold">Hindi</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Button
        onClick={() => navigate('/register')}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-2xl font-extrabold py-8 rounded-xl shadow-md transition mt-2"
      >
        Register Now @ ₹199/-
      </Button>
    </div>
  );
};

export default WorkshopDetailsBox;
