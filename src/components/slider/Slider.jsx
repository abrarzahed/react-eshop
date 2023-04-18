import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import { useState } from "react";
import "./slider.scss";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = sliderData.length;

  const nextSlide = () => {
    if (currentSlide === slideLength - 1) {
      setCurrentSlide(0);
    }
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slideLength);
    }
    setCurrentSlide((prev) => prev - 1);
  };

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, i) => {
        return (
          <div
            key={i}
            className={i === currentSlide ? " slide current" : "slide"}
          >
            {i === currentSlide && (
              <>
                <img src={slide.image} alt="slide" />
                <div className="content">
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
