import { CheckCircle } from "lucide-react";

const benefits = [
  "Complete roadmap to start your 3D printing business from scratch",
  "Live Q&A session - get your specific questions answered",
  "Secret supplier contacts for affordable 3D printers and filaments",
  "Pricing strategies to maximize your profit margins",
  "Marketing blueprint to get your first 10 customers in 30 days",
  "Product design templates and popular niche ideas",
  "Order management and delivery systems",
  "How to scale from ₹20,000/month to ₹2 lakhs/month",
  "Lifetime access to private community group",
  "Certificate of completion",
  "Weekly mastermind sessions (for 1 month after workshop)",
  "Bonus: 50 ready-to-print product designs",
];

const WhatYouGet = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What You'll <span className="text-primary">Actually Get</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to launch and grow a profitable 3D printing business
          </p>
        </div>

        <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">
                Total Value: <span className="text-muted-foreground line-through">₹999</span>
              </p>
              <p className="text-5xl font-bold text-primary mb-4">
                Today Only: ₹199
              </p>
              <p className="text-accent text-xl font-semibold">
                That's 99% OFF - Limited Time Offer!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
