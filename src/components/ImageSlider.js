import "./ImageSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "@reach/router";

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
      <section className="imageSlider">
        <Slider {...settings}>
          {slides.map((slide, index) => {
            return (
              <div key={index}>
                <article className="imageSlider__content">
                  <div>
                    <h1 className="imageSlider__title">{slide.title}</h1>
                    <p className="imageSlider__text">{slide.text}</p>
                    <Link to="/shop" className="imageSlider__button">{slide.button} <i className="fas fa-arrow-right" /></Link>
                  </div>
                  <img src={slide.image} alt="slider" className="imageSlider__image" />
                </article>
              </div>
            );
          })}
        </Slider>
      </section>
    </>
  );
}
