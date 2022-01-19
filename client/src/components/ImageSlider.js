import "./ImageSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider({ slides }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <section className="imageSlider">
        <Slider {...settings}>
          {slides.map((slide, index) => {
            return (
              <div key={index}>
                <img src={slide.image} alt="slider" />
              </div>
            );
          })}
        </Slider>
      </section>
    </>
  );
}
