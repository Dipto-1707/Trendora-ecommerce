import { getdata } from "../Context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Carousel() {
  const { data } = getdata();
  const { handleAddtoCart } = useCart();
  const navigate = useNavigate();
  // Track current slide
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    cssEase: "ease-in-out",
    beforeChange: (_, next) => setActiveSlide(next), // <-- track current slide
    appendDots: (dots) => (
      <div>
        <ul className="mb-4 flex justify-center gap-1">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3.5 h-1 rounded-full bg-white/50 hover:bg-white transition-all cursor-pointer" />
    ),
  };
  // console.log(data)

  return (
    <>
      <div className="relative overflow-hidden bg-black">
        <Slider {...settings}>
          {data?.slice(0, 15).map((item, index) => (
            <div key={index}>
              <div className="bg-black">
                <div className="max-w-7xl mx-auto px-8 lg:px-20">
                  <div className="grid md:grid-cols-2 gap-20 items-center min-h-[600px] py-16">
                    {/* Content Section */}
                    <div className="space-y-8 order-2 md:order-1">
                      <h1 className="text-5xl lg:text-5xl font-light text-white leading-tight line-clamp-2 tracking-tight">
                        {item.title}
                      </h1>

                      <p className="text-lg text-gray-400 leading-relaxed line-clamp-2 max-w-lg font-light">
                        {item.description}
                      </p>
                      <div className="flex gap-10">
                        <div className="pt-6">
                          <button
                            onClick={() => navigate("/products")}
                            className="relative bg-white text-black font-medium px-12 py-4 rounded-none hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]"
                          >
                            Shop Now
                          </button>
                        </div>
                        <div className="pt-6">
                          <button
                            onClick={() => handleAddtoCart(item)}
                            className="relative bg-white text-black font-medium px-12 py-4 rounded-none hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center items-center order-1 md:order-2">
                      <div className="relative w-[450px] h-[450px] rounded-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading={
                            index === 0 || index === activeSlide
                              ? "eager"
                              : "lazy"
                          }
                          fetchPriority={index === 0 ? "high" : "auto"}
                          onClick={() => navigate(`/products/${item._id}`)}
                          className="h-auto w-auto object-cover transition-all duration-700 hover:scale-105 ease-in-out grayscale-[30%] hover:grayscale-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <h2 className="text-center text-2xl md:text-3xl tracking-widest font-light mb-12 pt-5 uppercase bg-gradient-to-r from-gray-100 via-gray-300 to-white bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite] will-change-transform">
          Wanna grab more ?
        </h2>
      </div>
    </>
  );
}

export default Carousel;
