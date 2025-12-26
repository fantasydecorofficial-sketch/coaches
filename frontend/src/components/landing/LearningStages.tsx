import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Palette, Printer, ShoppingBag, Shapes, ArrowRightIcon } from "lucide-react";

const stages = [
  {
    title: "Design",
    subtitle: "Creating 3D Models",
    description: "Learn free & paid 3D modeling tools, design logic, and product-market fit for printable items.",
    icon: Shapes,
    bgImage: "/designing.PNG",
  },
  {
    title: "Print",
    subtitle: "Professional Touch",
    description: "Choose your first printer, slice models correctly, avoid filament waste, and print products efficiently.",
    icon: Printer,
    bgImage: "/printing.PNG",
  },
  {
    title: "Color",
    subtitle: "Hands-On Production",
    description: "Learn filament selection, surface finishing, painting techniques, and preparing products for sale.",
    icon: Palette,
    bgImage: "/coloring.PNG",
  },
  {
    title: "Sell",
    subtitle: "Your 3D Printed Products",
    description: "Learn how to build an online storefront, list products, use marketplaces, attract orders, and scale.",
    icon: ShoppingBag,
    bgImage: "/selling.jpg",
  },
];

const LearningStages = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 3000); // Auto scroll every 3 seconds

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="py-2 px-0 bg-secondary/50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Learn <span className="text-primary">4 Stages</span> to Start & Scale a Profitable
        </h2>
        <p className="text-sm md:text-md text-center mb-12 font-semibold pt-2">
          {
            stages.map((stage) =>
              <span className="inline-flex" key={stage.title}>
                {stage.title}
                <ArrowRightIcon className="w-6 h-6 text-primary mx-2" />
              </span>
            )
          }
        </p>

        <div className="max-w-5xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="relative h-[400px] rounded-xl overflow-hidden group cursor-pointer">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${stage.bgImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

                      <div className="relative h-full p-4 flex flex-col justify-end text-white">
                        <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 border border-primary/30">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{stage.title}</h3>
                        <p className="text-sm text-primary font-medium mb-1">{stage.subtitle}</p>
                        <p className="text-sm text-white/90 leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LearningStages;
