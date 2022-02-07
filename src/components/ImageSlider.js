import "./ImageSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "@reach/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ImageSlider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function getSlides() {
      try {
        const { data } = await axios.get(`https://postly-dk.herokuapp.com/slides`);
        setSlides(data);
      } catch (error) {
        console.log(error);
      }
    }
    getSlides();
  }, []);

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
              <div key={slide.id}>
                <article className="imageSlider__content">
                  <div>
                    <h1 className="imageSlider__title">{slide.title}</h1>
                    <p className="imageSlider__text">{slide.text}</p>
                    <Link to={slide.button_link} className="imageSlider__button">
                      {slide.button_text} <i className="fas fa-arrow-right" />
                    </Link>
                  </div>
                  <img
                    src={slide.image.url}
                    alt={"slide " + (index + 1)}
                    className="imageSlider__image"
                  />
                </article>
              </div>
            );
          })}
        </Slider>
      </section>
    </>
  );
}
