import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/outline";

export default function ImageSlider({ slides }) {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnFocus: true,
    pauseOnHover: true,
  };

  return (
    <>
      <section>
        <Slider {...settings}>
          {slides.map((slide, index) => {
            return (
              <div key={slide.id}>
                <article
                  className="flex flex-wrap sm:flex-nowrap gap-4 lg:gap-10 sm:items-center my-4"
                  key={slide.id}>
                  <div className="aspect-square rounded-md overflow-hidden w-full sm:w-1/2 sm:order-1 relative">
                    <Image
                      src={slide.image.url}
                      alt={"slide " + (index + 1)}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div className="w-full sm:w-1/2 flex flex-col my-5 text-black">
                    <h1 className="text-2xl font-medium mb-2">{slide.title}</h1>
                    <p className="text-[0.95rem]">{slide.text}</p>
                    <Link href={slide.button_link}>
                      <a className="flex items-center border-b border-neutral-500 max-w-max mt-5 text-sm px-10 py-3.5 text-white bg-black capitalize">
                        {slide.button_text} <ChevronRightIcon className="h-4 w-4" />
                      </a>
                    </Link>
                  </div>
                </article>
              </div>
            );
          })}
        </Slider>
      </section>
    </>
  );
}
