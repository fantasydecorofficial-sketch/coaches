import { Clock, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UrgencySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent via-accent-glow to-accent">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <AlertCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Limited Seats Available!
            </h2>
            <p className="text-xl text-muted-foreground">
              Only <span className="text-accent font-bold text-3xl">47 seats</span> left for this batch
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-secondary/20 rounded-xl p-6 text-center">
              <Clock className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-bold text-2xl mb-1">48 Hours</p>
              <p className="text-muted-foreground">Registration Closes</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-6 text-center">
              <Users className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-bold text-2xl mb-1">100 Max</p>
              <p className="text-muted-foreground">Total Seats</p>
            </div>
            <div className="bg-secondary/20 rounded-xl p-6 text-center">
              <AlertCircle className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-bold text-2xl mb-1">47 Left</p>
              <p className="text-muted-foreground">Available Now</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/register")}
              className="bg-accent hover:bg-accent/90"
            >
              Secure Your Seat Now @ ₹199
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              ⚡ 200% Money-Back Guarantee • Instant Access • No Hidden Charges
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
