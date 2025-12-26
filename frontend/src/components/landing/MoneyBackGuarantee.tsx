import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MoneyBackGuarantee = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-10 pb-24 px-4 bg-secondary/5 border-y border-border/50">
      <div className="container mx-auto max-w-4xl text-center">

        <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight">
          100% <span className="text-primary">Results</span> Guarantee
        </h2>

        <div className="inline-flex items-center justify-center w-36 h-36 rounded-full mb-8">
          <img src="/moneyback.png" alt="Money Back" className="w-full h-full object-cover" />
        </div>

        <p className="text-log font-semibold mb-10 leading-relaxed max-w-2xl mx-auto md:text-2xl">
          Every Student Gets Results, Performs Well, Sets up a successfull business and Gets Success.
          <br />
          <span className="font-bold">Just Try It!</span>
        </p>

        <Button
          onClick={() => navigate('/register')}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xl px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Register Now @ ₹199/-
        </Button>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;
