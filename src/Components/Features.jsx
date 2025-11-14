import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

function Features() {
  return (
    <section className="bg-black py-10 px-8 sm:px-10 lg:px-20 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((features, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left group hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white group-hover:shadow-lg transition-shadow duration-300">
              <features.icon className="h-6 w-6 text-pink-600" />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <h3 className="text-lg font-semibold text-white">
                {features.text}
              </h3>
              <p className="mt-1 text-sm text-gray-400">{features.subtext}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
