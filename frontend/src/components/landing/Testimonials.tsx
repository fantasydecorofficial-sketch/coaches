import { Card } from "@/components/ui/card";
import { Link, Star, ThumbsUp } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Mumbai",
    rating: 5,
    text: "I joined this course with zero knowledge about 3D printing. Today, I run my own small 3D statue business. The guidance and support were absolutely amazing.",
    date: "2 weeks ago",
    profile: "/rahul-sharma.JPG",
  },
  {
    name: "Priya Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "This course explains everything in a very simple and practical way. From design to printing and finishing, every step is crystal clear.",
    date: "1 month ago",
    profile: "/priya-patel.JPG",
  },
  {
    name: "Amit Kumar",
    location: "Delhi",
    rating: 5,
    text: "I was afraid that 3D printing would be too technical, but the instructor made it super easy for beginners like me.",
    date: "3 weeks ago",
    profile: "/amit-kumar.JPG",
  },
  {
    name: "Sneha Reddy",
    location: "Bangalore",
    rating: 5,
    text: "This is not just a learning course, it’s a complete business-oriented training. I learned how to get customers and price my work.",
    date: "1 week ago",
    profile: "/sneha-reddy.JPG",
  },
  {
    name: "Karan Singh",
    location: "Jaipur",
    rating: 5,
    text: "Whenever I got stuck, I received fast support. The mentorship helped me avoid costly mistakes in printing.",
    date: "4 days ago",
    profile: "/karan-singh.JPG",
  },
  {
    name: "Neha Gupta",
    location: "Pune",
    rating: 5,
    text: "The quality of teaching is outstanding. Even complex settings like resin exposure and slicing became simple.",
    date: "2 weeks ago",
    profile: "/neha-gupta.JPG",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-1 bg-teal-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          What Our <span className="text-green-500">Students</span> Say...
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-2 bg-white shadow-sm hover:shadow-md transition-shadow rounded-none">
              <div className="flex items-start gap-3 mb-3 border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                  <img src={testimonial.profile} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2 justify-between">
                <div className="flex items-center gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 bg-green-500 fill-white text-green-500" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{testimonial.date}</span>
              </div>

              <p className="text-sm font-semibold leading-relaxed border-b border-gray-200 pb-3">
                {testimonial.text}
              </p>

              <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-700">
                  <ThumbsUp className="w-4 h-4" /> Useful
                </button>
                <button className="flex items-center gap-1 hover:text-gray-700">
                  <Link className="w-4 h-4" /> Share
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
