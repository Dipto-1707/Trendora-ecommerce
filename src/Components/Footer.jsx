import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0F0F] text-gray-300 py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div>
          <Link to="/" className="inline-block mb-3" aria-label="Home">
            <h1 className="text-pink-700 text-3xl font-bold tracking-wide leading-none">
              Trendora
            </h1>
          </Link>
          <p className="text-sm leading-relaxed">
            Powering Your World with the Best Goods.
          </p>
          <address className="mt-3 space-y-1 text-sm not-italic">
            <p>Kolkata, West Bengal</p>
            <p>
              Email:{" "}
              <a
                href="mailto:roysudipta1707@gmail.com"
                className="hover:text-gray-400 transition-colors"
              >
                roysudipta1707@gmail.com
              </a>
            </p>
            <p>Phone: +91 8334925850</p>
          </address>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Contact Us",
              "Shipping & Returns",
              "FAQs",
              "Order Tracking",
              "Size Guide",
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-gray-400 transition-colors duration-200 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5 text-2xl">
            {[FaFacebook, FaInstagram, FaTwitterSquare, FaPinterest].map(
              (Icon, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center w-8 h-8"
                >
                  <Icon
                    className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:text-pink-600"
                    aria-label={`Follow on ${Icon.name.replace("Fa", "")}`}
                  />
                </span>
              )
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Stay in the Loop
          </h3>
          <p className="text-sm mb-4">
            Subscribe to get special offers, free giveaways, and more.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className=" flex bg-gray-100 rounded-md overflow-hidden shadow-inner"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-3 bg-transparent text-black placeholder-gray-400 focus:outline-none text-sm"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="text-sm bg-gradient-to-r from-red-500 to-pink-500 px-3 py-3 text-white font-medium "
            >
            Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>
          &copy; {currentYear}{" "}
          <span className="text-pink-700 font-semibold">Trendora</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
