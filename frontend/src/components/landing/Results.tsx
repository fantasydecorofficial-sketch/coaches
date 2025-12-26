const results = [
  {
    stat: "5,000+",
    label: "Students Trained",
  },
  {
    stat: "₹2.5 Cr+",
    label: "Revenue Generated",
  },
  {
    stat: "87%",
    label: "Success Rate",
  },
  {
    stat: "4.9/5",
    label: "Average Rating",
  },
];

const Results = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary-glow to-primary">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real Results From Real People
          </h2>
          <p className="text-xl text-white/90">
            Our students are building successful businesses every day
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {results.map((result, index) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                {result.stat}
              </p>
              <p className="text-lg text-white/90">{result.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl text-white font-semibold mb-6">
            Join thousands of successful entrepreneurs who started with this workshop
          </p>
        </div>
      </div>
    </section>
  );
};

export default Results;
