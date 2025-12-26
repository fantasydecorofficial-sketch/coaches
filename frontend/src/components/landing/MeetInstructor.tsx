import { Card } from "@/components/ui/card";
import { Award, Users, TrendingUp } from "lucide-react";

const MeetInstructor = () => {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-1 tracking-tight">
          Meet <span className="text-primary">Mr. Vedant Vani</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Instructor Image */}
          <div className="space-y-4 relative">
            <div className="absolute -inset-4 bg-accent/5 rounded-3xl -z-10 transform rotate-2"></div>
            <Card className="overflow-hidden border-0 shadow-2xl rounded-2xl">
              <img src="/vedant-vani.png" alt="Mr. Vedant Vani" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </Card>
          </div>

          {/* About Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-extrabold mb-6">About the Instructor</h3>
              <p className="text-lg font-bold leading-relaxed mb-6">
                Vedant Vani is a pioneering entrepreneur in India's 3D printing industry with over 7 years of hands-on experience. He has successfully built and scaled multiple 3D printing businesses from the ground up.
              </p>
            </div>

            {/* Awards & Achievements */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Industry Leader</p>
                    <p className="text-sm text-muted-foreground">Featured in top magazines</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">12,000+ Students</p>
                    <p className="text-sm text-muted-foreground">Trained globally</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">₹50 Lakh+ Revenue</p>
                    <p className="text-sm text-muted-foreground">Generated from 3D printing business</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetInstructor;
