const BonusSection = () => {

  return (
    <section className="py-10 px-1 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h2 className="text-xl md:text-4xl font-bold">
            <span className="text-primary">4 Lucky Participants</span> will Receive
          </h2>
          <p className="text-xl md:text-2xl font-bold text-accent">
            Free 3D Printing Machine
          </p>
        </div>

        <div className="flex justify-center">
          <img src="printers.JPG" alt="Printers giveaway" className="w-full h-full object-cover hover:scale-110 transition-all duration-300" />
        </div>
      </div>
      <div className="container mx-auto max-w-4xl text-center pt-10 px-3">
        <div className="mb-8">
          <h2 className="text-xl md:text-4xl font-bold">
            <span className="text-primary">4 Lucky Participants</span> will Receive
          </h2>
          <p className="text-xl md:text-2xl font-bold text-accent">
            Free 3D Printing Machine
          </p>
        </div>

        <div className="flex justify-center">
          <img src="IMG_6217.PNG" alt="Printers giveaway" className="w-full h-full object-cover hover:scale-110 transition-all duration-300" />
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
